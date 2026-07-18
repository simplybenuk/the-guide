import { z } from "zod";

const semanticVersion = /^\d+\.\d+\.\d+$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const unique = (values) => new Set(values).size === values.length;

const estimatedMinutesSchema = z
  .object({
    min: z.number().int().min(1).max(60),
    max: z.number().int().min(1).max(60),
  })
  .strict()
  .refine(({ min, max }) => min <= max, {
    message: "estimatedMinutes.min must not exceed estimatedMinutes.max",
  });

const compatibilitySchema = z
  .object({
    status: z.enum(["untested", "experimental", "compatible"]),
    testedHarnessClasses: z
      .array(z.enum(["consumer_assistant", "personal_agent", "coding_agent"]))
      .max(3)
      .refine(unique, { message: "testedHarnessClasses must be unique" }),
  })
  .strict()
  .superRefine(({ status, testedHarnessClasses }, context) => {
    if (status === "untested" && testedHarnessClasses.length > 0) {
      context.addIssue({
        code: "custom",
        path: ["testedHarnessClasses"],
        message: "untested cartridges cannot declare tested harness classes",
      });
    }
    if (status === "compatible" && testedHarnessClasses.length < 2) {
      context.addIssue({
        code: "custom",
        path: ["testedHarnessClasses"],
        message: "compatible cartridges require evidence from at least two harness classes",
      });
    }
  });

export const elixirMetadataSchema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    id: z.string().regex(/^the-guide\.elixir\.[a-z0-9]+(?:-[a-z0-9]+)*$/),
    slug: z.string().regex(slugPattern),
    title: z.string().trim().min(1).max(80),
    summary: z.string().trim().min(1).max(180),
    playerPromise: z.string().trim().min(1).max(240),
    publisher: z
      .object({
        name: z.literal("The Guide"),
      })
      .strict(),
    version: z.string().regex(semanticVersion),
    status: z.enum(["experimental", "stable"]),
    estimatedMinutes: estimatedMinutesSchema,
    energy: z.enum(["low", "medium"]),
    movement: z.enum(["none", "stay_here"]),
    requiredInputs: z
      .array(
        z.enum([
          "time",
          "energy",
          "hard_boundary",
          "environment_detail",
          "genre_boundary",
          "free_text_choice",
        ]),
      )
      .min(1)
      .max(6)
      .refine(unique, { message: "requiredInputs must be unique" }),
    gameplayCapability: z.literal("conversation_only"),
    dataBehavior: z
      .object({
        guideReceives: z.literal("none"),
        providerProcessing: z.literal("user_chosen_harness"),
        memory: z.literal("current_session_only"),
        mementoStorage: z.literal("user_chosen_harness"),
      })
      .strict(),
    compatibility: compatibilitySchema,
    covenantVersion: z.string().regex(semanticVersion),
    artwork: z
      .object({
        path: z.string().regex(/^assets\/cartridges\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:png|webp)$/),
        width: z.number().int().min(1).max(4096),
        height: z.number().int().min(1).max(4096),
        altText: z.string().trim().min(1).max(240),
        provenanceId: z.string().regex(/^art-[a-z0-9]+(?:-[a-z0-9]+)*$/),
      })
      .strict(),
  })
  .strict()
  .superRefine(({ id, slug, artwork }, context) => {
    if (id !== `the-guide.elixir.${slug}`) {
      context.addIssue({
        code: "custom",
        path: ["id"],
        message: "id must end with the declared slug",
      });
    }

    const artworkSlug = artwork.path.match(/^assets\/cartridges\/([^.]+)\./)?.[1];
    if (artworkSlug !== slug) {
      context.addIssue({
        code: "custom",
        path: ["artwork", "path"],
        message: "artwork filename must match the cartridge slug",
      });
    }
  });

export const ELIXIR_METADATA_FENCE = "elixir-metadata";
