"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  clearArchive,
  deleteExpedition,
  latestReturnDetail,
  loadArchive,
  saveArchive,
  saveBuddy,
  saveExpedition,
} from "@/domain/archive";
import {
  pauseExpedition,
  resumeExpedition,
  stopExpedition,
} from "@/domain/engine";
import { createUuid } from "@/domain/ids";
import {
  buddySchema,
  expeditionSchema,
  type Archive,
  type Expedition,
} from "@/domain/schemas";
import { PixelGameShell } from "@/components/pixel-game-shell";
import { PixelAsset } from "@/components/pixel-asset";
import { clearSoundPreference, playSound } from "@/lib/audio";

type View = "arrival" | "buddy" | "setup" | "ritual" | "transformation" | "play" | "ending" | "archive";
type RitualStep = "room_ready" | "elixir_selected" | "choice_open" | "resolved";

const voices = ["Warm and observant", "Dry and quietly funny", "Gentle and mysterious"];
const curiosities = ["Overlooked details", "Small signs of life", "How ordinary things are made"];
const peculiarities = [
  "Names ordinary discoveries",
  "Collects unusual comparisons",
  "Notices changes in light",
];

export function GuideExperience() {
  const [archive, setArchive] = useState<Archive>();
  const [view, setView] = useState<View>("arrival");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [buddyName, setBuddyName] = useState("");
  const [voice, setVoice] = useState(voices[0]);
  const [curiosity, setCuriosity] = useState(curiosities[0]);
  const [peculiarity, setPeculiarity] = useState(peculiarities[0]);
  const [timeBudget, setTimeBudget] = useState(10);
  const [energy, setEnergy] = useState<Expedition["energy"]>("medium");
  const [boundaries, setBoundaries] = useState("");
  const [response, setResponse] = useState("");
  const [ritualStep, setRitualStep] = useState<RitualStep>("room_ready");
  const [curiosityCollected, setCuriosityCollected] = useState(false);
  const [roomMessage, setRoomMessage] = useState("The room is quiet. Something glints on the table.");
  const [pendingTransformation, setPendingTransformation] = useState<boolean>();
  const [departureReady, setDepartureReady] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ritualResolvedRef = useRef(false);
  const expeditionCreatedRef = useRef(false);
  const advanceInFlightRef = useRef(false);
  const turnAbortRef = useRef<AbortController | null>(null);
  const interactionEpochRef = useRef(0);
  const startRequestRef = useRef<{ fingerprint: string; id: string } | null>(null);
  const turnRequestRef = useRef<{ fingerprint: string; id: string } | null>(null);

  useEffect(() => {
    try {
      const restored = loadArchive(window.localStorage);
      // Local storage is client-only; this effect is the intentional hydration boundary.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setArchive(restored);
      if (restored.activeExpedition) setView("play");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Saved data could not be restored.");
    }
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [archive?.activeExpedition?.status, archive?.activeExpedition?.turnNumber, view]);

  useEffect(() => {
    if (view !== "transformation" || departureReady) return;
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1800;
    const timer = window.setTimeout(() => setDepartureReady(true), delay);
    return () => window.clearTimeout(timer);
  }, [departureReady, view]);

  function persist(next: Archive) {
    const saved = saveArchive(window.localStorage, next);
    setArchive(saved);
    return saved;
  }

  function resetLocalData() {
    const next = clearArchive(window.localStorage);
    clearSoundPreference();
    setArchive(next);
    setError("");
    setBuddyName("");
    setView("arrival");
  }

  function createBuddy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!archive) return;
    try {
      const buddy = buddySchema.parse({
        id: createUuid(),
        name: buddyName,
        voiceDescription: voice,
        curiosities: [curiosity],
        peculiarities: [peculiarity],
        memoryPolicy: "archive_with_consent",
      });
      persist(saveBuddy(archive, buddy));
      setError("");
      setView("setup");
    } catch {
      setError("Give your buddy a name between 1 and 40 characters.");
    }
  }

  function beginRitual(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    ritualResolvedRef.current = false;
    expeditionCreatedRef.current = false;
    setPendingTransformation(undefined);
    setDepartureReady(false);
    setRitualStep("room_ready");
    setCuriosityCollected(false);
    setRoomMessage("The room is quiet. Something glints on the table.");
    setView("ritual");
  }

  function resolveElixir(transformed: boolean) {
    if (!archive?.buddy || ritualResolvedRef.current) return;
    ritualResolvedRef.current = true;
    setRitualStep("resolved");
    setPendingTransformation(transformed);
    void playSound("elixir");
    setDepartureReady(false);
    setView("transformation");
  }

  async function enterExpedition() {
    if (!archive?.buddy || pendingTransformation === undefined || expeditionCreatedRef.current) return;
    expeditionCreatedRef.current = true;
    setBusy(true);
    try {
      const startPayload = {
        installationId: archive.installationId,
        buddy: archive.buddy,
        timeBudgetMinutes: timeBudget,
        energy,
        boundaries: boundaries.split(/[,\n]/).map((item) => item.trim()).filter(Boolean).slice(0, 8),
        transformed: pendingTransformation,
      };
      const fingerprint = JSON.stringify(startPayload);
      if (startRequestRef.current?.fingerprint !== fingerprint) {
        startRequestRef.current = { fingerprint, id: createUuid() };
      }
      const result = await fetch("/api/expedition/start", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          requestId: startRequestRef.current.id,
          ...startPayload,
        }),
      });
      const payload: unknown = await result.json();
      if (!result.ok || !payload || typeof payload !== "object" || !("state" in payload)) {
        throw new Error("No safe opening instruction fits the boundaries you chose.");
      }
      const expedition = expeditionSchema.parse(payload.state);
      startRequestRef.current = null;
      persist(saveExpedition(archive, expedition));
      void playSound("departure");
      setResponse("");
      setError("");
      setView("play");
    } catch (reason) {
      ritualResolvedRef.current = false;
      expeditionCreatedRef.current = false;
      setError(reason instanceof Error ? reason.message : "No safe opening instruction fits the boundaries you chose.");
      setView("setup");
    } finally {
      setBusy(false);
    }
  }

  function pickUpElixir() {
    if (ritualStep !== "room_ready") return;
    setRitualStep("elixir_selected");
    void playSound("pickup");
    setRoomMessage("The elixir settles into your inventory. It is warm, though the room is cold.");
  }

  function collectCuriosity() {
    if (curiosityCollected) return;
    setCuriosityCollected(true);
    void playSound("pickup");
    setRoomMessage("A brass token slips into your inventory. It is pleasingly useless.");
  }

  function offerElixir() {
    if (ritualStep !== "elixir_selected") return;
    setRitualStep("choice_open");
    setRoomMessage(`${archive?.buddy?.name ?? "Your buddy"} looks at the bottle, then at you.`);
  }

  function openRitualChoice() {
    if (ritualStep === "resolved") return;
    setRitualStep("choice_open");
    setRoomMessage("The room draws close around a single choice.");
  }

  async function advance(kind: "done" | "unexpected" | "not_possible") {
    if (!archive?.activeExpedition || !archive.buddy || advanceInFlightRef.current) return;
    advanceInFlightRef.current = true;
    const epoch = interactionEpochRef.current;
    const controller = new AbortController();
    turnAbortRef.current = controller;
    const fingerprint = JSON.stringify({
      expeditionId: archive.activeExpedition.id,
      turnNumber: archive.activeExpedition.turnNumber,
      instructionId: archive.activeExpedition.currentInstruction?.id,
      kind,
      text: response,
    });
    if (turnRequestRef.current?.fingerprint !== fingerprint) {
      turnRequestRef.current = { fingerprint, id: createUuid() };
    }
    setBusy(true);
    setError("");
    try {
      const result = await fetch("/api/expedition/turn", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          requestId: turnRequestRef.current.id,
          state: archive.activeExpedition,
          buddy: archive.buddy,
          kind,
          text: response,
        }),
        signal: controller.signal,
      });
      const payload: unknown = await result.json();
      if (!result.ok || !payload || typeof payload !== "object" || !("state" in payload)) {
        const message =
          payload && typeof payload === "object" && "error" in payload
            ? String(payload.error)
            : "The expedition could not advance.";
        throw new Error(message);
      }
      const state = expeditionSchema.parse(payload.state);
      if (interactionEpochRef.current !== epoch) return;
      turnRequestRef.current = null;
      persist(saveExpedition(archive, state));
      setResponse("");
      if (state.status === "complete" || state.status === "stopped") setView("ending");
    } catch (reason) {
      if (!(reason instanceof Error && reason.name === "AbortError")) {
        setError("The expedition could not advance. Your response is still here; you can try again or stop.");
      }
    } finally {
      advanceInFlightRef.current = false;
      if (turnAbortRef.current === controller) turnAbortRef.current = null;
      setBusy(false);
    }
  }

  function pause() {
    if (!archive?.activeExpedition) return;
    persist(saveExpedition(archive, pauseExpedition(archive.activeExpedition)));
  }

  function resume() {
    if (!archive?.activeExpedition) return;
    persist(saveExpedition(archive, resumeExpedition(archive.activeExpedition)));
  }

  function stop() {
    if (!archive?.activeExpedition) return;
    if (!window.confirm("End this expedition and return home? Your partial journey will be saved.")) {
      return;
    }
    interactionEpochRef.current += 1;
    turnAbortRef.current?.abort();
    turnRequestRef.current = null;
    persist(saveExpedition(archive, stopExpedition(archive.activeExpedition)));
    setView("ending");
  }

  function removeExpedition(expeditionId: string) {
    if (!archive) return;
    persist(deleteExpedition(archive, expeditionId));
  }

  if (error && !archive) {
    return (
      <PixelGameShell>
        <section className="panel" aria-labelledby="recovery-title">
          <p className="eyebrow">The archive would not open</p>
          <h1 id="recovery-title" ref={headingRef} tabIndex={-1}>Return safely</h1>
          <p>{error}</p>
          <button className="primary" type="button" onClick={resetLocalData}>Delete local data and restart</button>
        </section>
      </PixelGameShell>
    );
  }

  if (!archive) {
    return <PixelGameShell aria-busy="true"><p>Opening the expedition cabinet…</p></PixelGameShell>;
  }

  const expedition = archive.activeExpedition;
  const returnDetail = latestReturnDetail(archive);

  if (view === "buddy") {
    return (
      <PixelGameShell>
        <section className="panel creation-panel" aria-labelledby="buddy-title">
          <p className="eyebrow">A companion takes shape</p>
          <div className="dialogue-intro">
            <PixelAsset kind="buddy" className="dialogue-portrait" fallbackText="Your buddy" />
            <div className="dialogue-box">
              <h1 id="buddy-title" ref={headingRef} tabIndex={-1}>Who is waiting?</h1>
              <p>Give the traveller a name, a voice, and one curious habit. It will remember the shape you choose.</p>
            </div>
          </div>
          <form onSubmit={createBuddy} className="stack character-form">
            <label>Buddy name<input required maxLength={40} value={buddyName} onChange={(event) => setBuddyName(event.target.value)} /></label>
            <label>Voice<select value={voice} onChange={(event) => setVoice(event.target.value)}>{voices.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Curiosity<select value={curiosity} onChange={(event) => setCuriosity(event.target.value)}>{curiosities.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>One peculiarity<select value={peculiarity} onChange={(event) => setPeculiarity(event.target.value)}>{peculiarities.map((item) => <option key={item}>{item}</option>)}</select></label>
            <p className="error" role="alert">{error}</p>
            <button className="primary" type="submit">Meet my buddy</button>
          </form>
          <p className="future-note">Already have a personal agent? Connection support is coming later.</p>
        </section>
      </PixelGameShell>
    );
  }

  if (view === "setup") {
    return (
      <PixelGameShell>
        <section className="panel boundary-panel" aria-labelledby="setup-title">
          <p className="eyebrow">Before the door opens</p>
          <div className="boundary-intro">
            <PixelAsset kind="buddy" className="boundary-buddy" fallbackText={archive.buddy?.name ?? "Your buddy"} />
            <div>
              <h1 id="setup-title" ref={headingRef} tabIndex={-1}>Set the edges</h1>
              <p>The door listens for three things before it opens.</p>
            </div>
          </div>
          <form onSubmit={beginRitual} className="stack boundary-form">
            <fieldset className="parchment-section"><legend>Time available</legend><div className="choice-row">{[10, 20, 30].map((minutes) => <label className="choice" key={minutes}><input type="radio" name="time" checked={timeBudget === minutes} onChange={() => setTimeBudget(minutes)} />{minutes} min</label>)}</div></fieldset>
            <fieldset className="parchment-section"><legend>Energy</legend><div className="choice-row">{(["low", "medium", "high"] as const).map((level) => <label className="choice" key={level}><input type="radio" name="energy" checked={energy === level} onChange={() => setEnergy(level)} />{level}</label>)}</div></fieldset>
            <label>Hard limits <span>optional, separated by commas</span><textarea rows={3} maxLength={500} value={boundaries} onChange={(event) => setBoundaries(event.target.value)} placeholder="For example: no writing, no standing" /></label>
            <div className="boundary-card" aria-label="Expedition boundary summary"><strong>Stay here · {timeBudget} minutes · {energy} energy</strong><span>You can refuse, pause, or stop at any time.</span></div>
            <p className="privacy-note">If live AI is enabled by the operator, your buddy traits, these limits, and this expedition&apos;s responses are sent to that provider. Other expeditions and archive records are not sent.</p>
            <p className="error" role="alert" aria-live="assertive">{error}</p>
            <button className="primary" type="submit">Prepare the elixir</button>
          </form>
        </section>
      </PixelGameShell>
    );
  }

  if (view === "ritual") {
    return (
      <PixelGameShell className="ritual-scene">
        <section className="panel ritual room-panel" aria-labelledby="ritual-title">
          <p className="eyebrow">The elixir room</p>
          <h1 id="ritual-title" ref={headingRef} tabIndex={-1}>Choose what happens next.</h1>
          <div className="room-stage" aria-label="A single mysterious room containing your buddy, an elixir, a brass token, a sealed portal, an astrolabe, and a cabinet">
            <PixelAsset kind="room" className="room-backdrop" />
            {ritualStep === "room_ready" ? (
              <button className="room-hotspot room-hotspot--elixir" type="button" onClick={pickUpElixir} aria-label="Pick up elixir">
                <PixelAsset kind="elixir" />
                <span className="hotspot-label">Elixir</span>
              </button>
            ) : null}
            <button className="room-hotspot room-hotspot--buddy" type="button" onClick={offerElixir} disabled={ritualStep !== "elixir_selected"} aria-label={`Offer elixir to ${archive.buddy?.name}`}>
              <PixelAsset kind="buddy" />
              <span className="hotspot-label">{archive.buddy?.name}</span>
            </button>
            {!curiosityCollected ? (
              <button className="room-hotspot room-hotspot--token" type="button" onClick={collectCuriosity} aria-label="Collect brass token">
                <span className="room-token-sprite" />
                <span className="hotspot-label">Brass token</span>
              </button>
            ) : null}
            <button className="room-hotspot room-hotspot--portal" type="button" onClick={() => setRoomMessage("The portal is sealed. It is waiting for the ritual to choose a path.")} aria-label="Inspect sealed portal">
              <span className="hotspot-label">Sealed portal</span>
            </button>
            <button className="room-hotspot room-hotspot--astrolabe" type="button" onClick={() => setRoomMessage("The brass rings describe a sky that does not belong to this world.")} aria-label="Inspect astrolabe">
              <span className="hotspot-label">Astrolabe</span>
            </button>
            <button className="room-hotspot room-hotspot--cabinet" type="button" onClick={() => setRoomMessage("The cabinet contains old maps, blank postcards, and one locked drawer.")} aria-label="Inspect cabinet">
              <span className="hotspot-label">Cabinet</span>
            </button>
          </div>
          <p className="room-message" aria-live="polite">{roomMessage}</p>
          <div className="room-inventory" aria-label="Inventory">
            <strong>Inventory</strong>
            <span className="inventory-items">
              {ritualStep === "elixir_selected" || ritualStep === "choice_open" ? <span className="inventory-item"><PixelAsset kind="elixir" />Elixir</span> : null}
              {curiosityCollected ? <span className="inventory-item"><span className="inventory-token" />Brass token</span> : null}
              {ritualStep === "room_ready" && !curiosityCollected ? <span>Empty</span> : null}
            </span>
          </div>
          {ritualStep === "choice_open" ? (
            <div className="ritual-choice">
              <p>{archive.buddy?.name} is waiting for permission. The elixir is fictional; nothing real is consumed.</p>
              <div className="button-stack"><button className="primary" type="button" onClick={() => resolveElixir(true)}>Let it drink</button><button className="secondary" type="button" onClick={() => resolveElixir(false)}>Keep {archive.buddy?.name} unchanged</button></div>
            </div>
          ) : (
            <button className="ritual-shortcut" type="button" onClick={openRitualChoice}>Begin ritual</button>
          )}
        </section>
      </PixelGameShell>
    );
  }

  if (view === "transformation" && pendingTransformation !== undefined) {
    return (
      <PixelGameShell className="transformation-scene">
        <section className="panel transformation-panel" aria-labelledby="transformation-title">
          <p className="eyebrow">The departure wakes</p>
          <div className={`transformation-stage${departureReady ? " is-ready" : ""}`}>
            <PixelAsset kind={pendingTransformation ? "buddy-transformed" : "buddy"} className="transformation-buddy" />
            <PixelAsset kind={departureReady ? "portal-active" : "portal-dormant"} className="transformation-portal" />
          </div>
          <h1 id="transformation-title" ref={headingRef} tabIndex={-1}>
            {pendingTransformation ? `${archive.buddy?.name} has become the expedition persona.` : `${archive.buddy?.name} remains itself.`}
          </h1>
          <p aria-live="polite">{departureReady ? "The portal is active. Your expedition is ready." : "The portal gathers itself from the dark."}</p>
          {!departureReady ? <button className="ritual-shortcut" type="button" onClick={() => setDepartureReady(true)}>Skip transformation</button> : null}
          <button className="primary departure-action" type="button" disabled={!departureReady || busy} onClick={() => void enterExpedition()}>{busy ? "Opening signal…" : "Enter expedition"}</button>
        </section>
      </PixelGameShell>
    );
  }

  if (view === "play" && expedition) {
    if (expedition.status === "paused") {
      return (
        <PixelGameShell>
          <section className="panel pause-panel" aria-labelledby="paused-title">
            <p className="eyebrow">Expedition paused</p>
            <PixelAsset kind="portal-dormant" className="pause-portal" />
            <h1 id="paused-title" ref={headingRef} tabIndex={-1}>The path will wait.</h1>
            <p>Your place and current instruction are saved on this device.</p>
            <div className="button-stack"><button className="primary" type="button" onClick={resume}>Resume expedition</button><button className="danger" type="button" onClick={stop}>Stop and return home</button></div>
          </section>
        </PixelGameShell>
      );
    }
    return (
      <PixelGameShell className="expedition-scene">
        <section className="panel expedition quest-panel" aria-labelledby="instruction-title">
          <div className="quest-companion">
            <PixelAsset kind={expedition.transformed ? "buddy-transformed" : "buddy"} className="expedition-buddy" />
            <header className="expedition-header"><span>{expedition.transformed ? "Expedition persona" : archive.buddy?.name}</span><span>Signal {expedition.turnNumber + 1} of 3</span></header>
          </div>
          <div className="quest-dialogue">
            <h1 id="instruction-title" ref={headingRef} tabIndex={-1}>{expedition.currentInstruction?.text}</h1>
            <p className="effort">{expedition.currentInstruction?.expectedMinutes} min · {expedition.currentInstruction?.physicalEffort} effort</p>
          </div>
          <form className="stack" onSubmit={(event) => { event.preventDefault(); void advance("done"); }}>
            <label>{expedition.currentInstruction?.responsePrompt}<textarea required rows={4} maxLength={240} value={response} onChange={(event) => setResponse(event.target.value)} /></label>
            <p className="error" role="alert" aria-live="polite">{error}</p>
            <button className="primary" disabled={busy} type="submit">{busy ? "Listening…" : "Done"}</button>
          </form>
          <div className="quiet-controls" aria-label="Expedition controls"><button type="button" disabled={busy || !response.trim()} onClick={() => void advance("unexpected")}>Unexpected</button><button type="button" disabled={busy} onClick={() => void advance("not_possible")}>Not possible</button><button type="button" disabled={busy} onClick={pause}>Pause</button><button type="button" onClick={stop}>{busy ? "Stop waiting" : "Stop"}</button></div>
        </section>
      </PixelGameShell>
    );
  }

  if (view === "ending") {
    const finished = archive.expeditions[0];
    return (
      <PixelGameShell>
        <section className="panel return-panel" aria-labelledby="ending-title">
          <p className="eyebrow">Returned home</p>
          <PixelAsset kind="buddy" className="ending-buddy" />
          <h1 id="ending-title" ref={headingRef} tabIndex={-1}>{finished?.status === "complete" ? "The expedition is complete." : "The path closes gently."}</h1>
          {finished?.status === "complete" ? <><p>{archive.buddy?.name} is itself again.</p><blockquote>{finished.reflection}</blockquote><article className="memento"><span>Field memento</span><h2>{finished.memento?.title}</h2><p>{finished.memento?.body}</p></article></> : <p>Your partial journey has been saved. Nothing more is required.</p>}
          <div className="button-stack"><button className="primary" type="button" onClick={() => setView("arrival")}>Return home</button><button className="secondary" type="button" onClick={() => setView("archive")}>Open the cabinet</button></div>
        </section>
      </PixelGameShell>
    );
  }

  if (view === "archive") {
    return (
      <PixelGameShell>
        <section className="panel wide cabinet-panel" aria-labelledby="archive-title">
          <p className="eyebrow">Private local archive</p>
          <PixelAsset kind="cabinet" className="cabinet-art" />
          <h1 id="archive-title" ref={headingRef} tabIndex={-1}>The cabinet</h1>
          <p className="privacy-note">Saved only in this browser. Clearing browser data removes it; nothing is synchronized across devices.</p>
          {archive.expeditions.length ? <ul className="archive-list">{archive.expeditions.map((item) => <li key={item.id}><div><strong>{item.memento?.title ?? "Partial expedition"}</strong><span>{item.status === "complete" ? item.memento?.body : "Stopped before completion"}</span></div><button type="button" onClick={() => removeExpedition(item.id)}>Delete</button></li>)}</ul> : <p>The cabinet is empty.</p>}
          <div className="button-stack"><button className="primary" type="button" onClick={() => setView("arrival")}>Close cabinet</button><button className="danger" type="button" onClick={() => { if (window.confirm("Delete your buddy and every local expedition?")) resetLocalData(); }}>Delete all local data</button></div>
        </section>
      </PixelGameShell>
    );
  }

  return (
    <PixelGameShell>
      <section className="encounter" aria-labelledby="arrival-title">
        <p className="eyebrow">{returnDetail ? "Welcome back" : "A small expedition machine"}</p>
        <PixelAsset kind="room" className="arrival-room" />
        <h1 id="arrival-title" ref={headingRef} tabIndex={-1}>{returnDetail ? `I remember ${returnDetail}.` : "Someone is waiting to meet you."}</h1>
        <p className="invitation">{returnDetail ? "There is another expedition waiting, if you would like it." : "Bring a little attention. Your buddy will take care of what happens next."}</p>
        <div className="button-stack"><button className="primary" type="button" onClick={() => setView(archive.buddy ? "setup" : "buddy")}>{archive.buddy ? "Begin another expedition" : "Meet my buddy"}</button>{archive.expeditions.length > 0 ? <button className="secondary" type="button" onClick={() => setView("archive")}>Open the cabinet</button> : null}</div>
        <p className="privacy-note">No account, location, or provider connection required.</p>
      </section>
    </PixelGameShell>
  );
}
