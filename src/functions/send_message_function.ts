import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in Workflows.
 * https://api.slack.com/future/functions/custom
 */
export const SendMessageFunctionDefinition = DefineFunction({
  callback_id: "send_message_function",
  title: "Send Message",
  source_file: "src/functions/send_message_function.ts",
  input_parameters: {
    properties: {
      channelId: {
        type: Schema.slack.types.channel_id,
      },
      message: {
        type: Schema.types.string,
        description: "Message to be posted",
      },
    },
    required: ["channelId", "message"],
  },
});

export default SlackFunction(
  SendMessageFunctionDefinition,
  async ({ inputs, token }) => {
    const { channelId, message } = inputs;
    const client = SlackAPI(token);
    await client.chat.postMessage({
      channel: channelId,
      text: message,
    });
    return { outputs: {} };
  },
);
