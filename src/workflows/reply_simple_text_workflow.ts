import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { SendMessageFunctionDefinition } from "../functions/send_message_function.ts";
import { ConvertIntoMessageFunctionDefinition } from "../functions/convert_into_message_function.ts";

/**
 * A Workflow is a set of steps that are executed in order.
 * Each step in a Workflow is a function.
 * https://api.slack.com/future/workflows
 */
const ReplySimpleTextWorkflow = DefineWorkflow({
  callback_id: "reply_simple_text_workflow",
  title: "Reply simple text workflow",
  description: "Reply simple text",
  input_parameters: {
    properties: {
      channelId: {
        type: Schema.slack.types.channel_id,
      },
      userId: {
        type: Schema.slack.types.user_id,
      },
      mentionText: {
        type: Schema.slack.types.rich_text,
      },
    },
    required: [],
  },
});

const convertedMessage = ReplySimpleTextWorkflow.addStep(
  ConvertIntoMessageFunctionDefinition,
  {
    userId: ReplySimpleTextWorkflow.inputs.userId,
    mentionText: ReplySimpleTextWorkflow.inputs.mentionText,
  },
);

ReplySimpleTextWorkflow.addStep(
  SendMessageFunctionDefinition,
  {
    channelId: ReplySimpleTextWorkflow.inputs.channelId,
    message: convertedMessage.outputs.convertedMessage,
  },
);

export default ReplySimpleTextWorkflow;
