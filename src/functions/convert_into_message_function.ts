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
  async ({ inputs }) => {
    const { userId, mentionText } = inputs;
    const response = await fetchOpenAiCompletion(mentionText);
    const convertedMessage = [
      `<@${userId}>`,
      `${response}`,
    ].join("\n");
    return { outputs: { convertedMessage } };
  },
);

const fetchOpenAiCompletion = async (text: string) => {
  const openAiApiKey = "open-api-key"
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify({
      prompt: text,
      model: "text-davinci-003",
      temperature: 0.9,
      max_tokens: 2048,
    }),
  });
  const json = await response.json();
  return json.choices[0].text.trim()
};
