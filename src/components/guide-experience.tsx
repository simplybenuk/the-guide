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
  createExpedition,
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

type View = "arrival" | "buddy" | "setup" | "ritual" | "play" | "ending" | "archive";

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
  const headingRef = useRef<HTMLHeadingElement>(null);

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
  }, [view]);

  function persist(next: Archive) {
    const saved = saveArchive(window.localStorage, next);
    setArchive(saved);
    return saved;
  }

  function resetLocalData() {
    const next = clearArchive(window.localStorage);
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
    setView("ritual");
  }

  function beginExpedition(transformed: boolean) {
    if (!archive?.buddy) return;
    try {
      const expedition = createExpedition({
        installationId: archive.installationId,
        buddy: archive.buddy,
        timeBudgetMinutes: timeBudget,
        energy,
        boundaries: boundaries.split(/[,\n]/).slice(0, 8),
        transformed,
      });
      persist(saveExpedition(archive, expedition));
      setResponse("");
      setError("");
      setView("play");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No safe opening instruction is available.");
      setView("setup");
    }
  }

  async function advance(kind: "done" | "unexpected" | "not_possible") {
    if (!archive?.activeExpedition || busy) return;
    setBusy(true);
    setError("");
    try {
      const result = await fetch("/api/expedition/turn", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ state: archive.activeExpedition, kind, text: response }),
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
      persist(saveExpedition(archive, state));
      setResponse("");
      if (state.status === "complete" || state.status === "stopped") setView("ending");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The expedition could not advance.");
    } finally {
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
        <section className="panel" aria-labelledby="buddy-title">
          <p className="eyebrow">A companion takes shape</p>
          <h1 id="buddy-title" ref={headingRef} tabIndex={-1}>Who is waiting?</h1>
          <form onSubmit={createBuddy} className="stack">
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
        <section className="panel" aria-labelledby="setup-title">
          <p className="eyebrow">Before the door opens</p>
          <h1 id="setup-title" ref={headingRef} tabIndex={-1}>Set the edges</h1>
          <form onSubmit={beginRitual} className="stack">
            <fieldset><legend>Time available</legend><div className="choice-row">{[10, 20, 30].map((minutes) => <label className="choice" key={minutes}><input type="radio" name="time" checked={timeBudget === minutes} onChange={() => setTimeBudget(minutes)} />{minutes} min</label>)}</div></fieldset>
            <fieldset><legend>Energy</legend><div className="choice-row">{(["low", "medium", "high"] as const).map((level) => <label className="choice" key={level}><input type="radio" name="energy" checked={energy === level} onChange={() => setEnergy(level)} />{level}</label>)}</div></fieldset>
            <label>Hard limits <span>optional, separated by commas</span><textarea rows={3} maxLength={500} value={boundaries} onChange={(event) => setBoundaries(event.target.value)} placeholder="For example: no writing, no standing" /></label>
            <div className="boundary-card"><strong>Stay here · {timeBudget} minutes · {energy} energy</strong><span>You can refuse, pause, or stop at any time.</span></div>
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
        <section className="panel ritual" aria-labelledby="ritual-title">
          <p className="eyebrow">A fictional transformation</p>
          <div className="ritual-assets" aria-hidden="true">
            <PixelAsset kind="buddy" />
            <PixelAsset kind="elixir" />
            <PixelAsset kind="portal-dormant" />
          </div>
          <h1 id="ritual-title" ref={headingRef} tabIndex={-1}>An elixir has been prepared.</h1>
          <p>{archive.buddy?.name} is waiting for permission. Nothing real is consumed.</p>
          <div className="button-stack"><button className="primary" type="button" onClick={() => beginExpedition(true)}>Let it drink</button><button className="secondary" type="button" onClick={() => beginExpedition(false)}>Keep {archive.buddy?.name} unchanged</button></div>
        </section>
      </PixelGameShell>
    );
  }

  if (view === "play" && expedition) {
    if (expedition.status === "paused") {
      return (
        <PixelGameShell>
          <section className="panel" aria-labelledby="paused-title">
            <p className="eyebrow">Expedition paused</p>
            <h1 id="paused-title" ref={headingRef} tabIndex={-1}>The path will wait.</h1>
            <p>Your place and current instruction are saved on this device.</p>
            <div className="button-stack"><button className="primary" type="button" onClick={resume}>Resume expedition</button><button className="danger" type="button" onClick={stop}>Stop and return home</button></div>
          </section>
        </PixelGameShell>
      );
    }
    return (
      <PixelGameShell className="expedition-scene">
        <section className="panel expedition" aria-labelledby="instruction-title">
          <PixelAsset kind={expedition.transformed ? "buddy-transformed" : "buddy"} className="expedition-buddy" />
          <header className="expedition-header"><span>Expedition {expedition.turnNumber + 1} of 3</span><span>{expedition.transformed ? "Expedition persona" : archive.buddy?.name}</span></header>
          <h1 id="instruction-title" ref={headingRef} tabIndex={-1}>{expedition.currentInstruction?.text}</h1>
          <p className="effort">About {expedition.currentInstruction?.expectedMinutes} min · {expedition.currentInstruction?.physicalEffort} effort</p>
          <form className="stack" onSubmit={(event) => { event.preventDefault(); void advance("done"); }}>
            <label>{expedition.currentInstruction?.responsePrompt}<textarea required rows={4} maxLength={240} value={response} onChange={(event) => setResponse(event.target.value)} /></label>
            <p className="error" role="alert" aria-live="polite">{error}</p>
            <button className="primary" disabled={busy} type="submit">{busy ? "Listening…" : "Done"}</button>
            <button className="secondary" disabled={busy || !response.trim()} type="button" onClick={() => void advance("unexpected")}>Something unexpected happened</button>
          </form>
          <div className="quiet-controls" aria-label="Expedition controls"><button type="button" disabled={busy} onClick={() => void advance("not_possible")}>Not possible</button><button type="button" disabled={busy} onClick={pause}>Pause</button><button type="button" disabled={busy} onClick={stop}>Stop</button></div>
        </section>
      </PixelGameShell>
    );
  }

  if (view === "ending") {
    const finished = archive.expeditions[0];
    return (
      <PixelGameShell>
        <section className="panel" aria-labelledby="ending-title">
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
        <section className="panel wide" aria-labelledby="archive-title">
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
