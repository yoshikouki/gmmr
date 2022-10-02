import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in Workflows.
 * https://api.slack.com/future/functions/custom
 */
export const ConvertIntoMessageFunctionDefinition = DefineFunction({
  callback_id: "convert_into_message_function",
  title: "Convert something into message",
  source_file: "src/functions/convert_into_message_function.ts",
  input_parameters: {
    properties: {
      userId: {
        type: Schema.slack.types.user_id,
      },
      mentionText: {
        type: Schema.slack.types.rich_text,
      },
    },
    required: ["userId", "mentionText"],
  },
  output_parameters: {
    properties: {
      convertedMessage: {
        type: Schema.types.string,
      },
    },
    required: ["convertedMessage"],
  },
});

export default SlackFunction(
  ConvertIntoMessageFunctionDefinition,
  ({ inputs }) => {
    const { userId, mentionText } = inputs;
    const convertedMessage =
      `Hello, ${userId}! Converted!\n\n\> ${mentionText}`;
    return { outputs: { convertedMessage } };
  },
);
