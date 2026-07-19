import { z } from "zod";

const semanticVersion = /^\d+\.\d+\.\d+$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const unique = (values) => new Set(values).size === values.length;

const estimatedMinutesSchema = (maximum) => z
  .object({
    min: z.number().int().min(1).max(maximum),
    max: z.number().int().min(1).max(maximum),
  })
  .strict()
  .refine(({ min, max }) => min <= max, {
    message: "estimatedMinutes.min must not exceed estimatedMinutes.max",
  });

const storyDetailsSchema = z
  .object({
    storyFormat: z.enum(["prelude", "feature", "long_feature", "serial"]),
    playerRole: z.string().trim().min(1).max(160),
    interactionModes: z
      .array(z.enum(["speech", "action", "decision"]))
      .min(1)
      .max(3)
      .refine(unique, { message: "story.interactionModes must be unique" }),
    choicePresentation: z.enum(["open", "hybrid", "authored_options"]),
    emotionalIntensity: z.enum(["gentle", "moderate", "high"]),
    readingIntensity: z.enum(["low", "medium", "high"]),
    beatProfile: z.object({
      count: z.number().int().min(3).max(24),
      acceptedTurns: z.object({
        min: z.number().int().min(3).max(40),
        max: z.number().int().min(3).max(40),
      }).strict().refine(({ min, max }) => min <= max,
        "story.beatProfile.acceptedTurns.min must not exceed max"),
    }).strict(),
    endingProfile: z
      .object({
        familyCount: z.number().int().min(3).max(4),
        description: z.string().trim().min(1).max(180),
      })
      .strict(),
    replayProfile: z
      .object({
        level: z.enum(["light", "moderate", "high"]),
        promise: z.string().trim().min(1).max(200),
      })
      .strict(),
    sessionShape: z.enum(["single_session", "multi_session"]),
    contentNotes: z
      .array(z.string().regex(/^content-[a-z0-9]+(?:-[a-z0-9]+)*$/))
      .max(12)
      .refine(unique, { message: "story.contentNotes must be unique" }),
  })
  .strict()
  .superRefine(({ storyFormat, sessionShape }, context) => {
    if (storyFormat === "serial" && sessionShape !== "multi_session") {
      context.addIssue({
        code: "custom",
        path: ["sessionShape"],
        message: "serial stories require a multi_session shape",
      });
    }
    if (storyFormat !== "serial" && sessionShape !== "single_session") {
      context.addIssue({
        code: "custom",
        path: ["sessionShape"],
        message: "non-serial stories require a single_session shape",
      });
    }
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

const sharedMetadataShape = {
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
};

const validateSharedMetadata = ({ id, slug, artwork }, context) => {
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
};

const elixirMetadataV1Schema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    ...sharedMetadataShape,
    estimatedMinutes: estimatedMinutesSchema(60),
  })
  .strict()
  .superRefine(validateSharedMetadata);

const storyMetadataV1_1Schema = z
  .object({
    schemaVersion: z.literal("1.1.0"),
    ...sharedMetadataShape,
    estimatedMinutes: estimatedMinutesSchema(180),
    story: storyDetailsSchema,
  })
  .strict()
  .superRefine(validateSharedMetadata);

export const elixirMetadataSchema = z.discriminatedUnion("schemaVersion", [
  elixirMetadataV1Schema,
  storyMetadataV1_1Schema,
]);

export const ELIXIR_METADATA_FENCE = "elixir-metadata";
