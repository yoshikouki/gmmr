import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

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

ReplySimpleTextWorkflow.addStep(
  Schema.slack.functions.SendMessage,
  {
    channel_id: ReplySimpleTextWorkflow.inputs.channelId,
    message:
      `Hello, ${ReplySimpleTextWorkflow.inputs.userId}! Shall we dance?\n\n\> ${ReplySimpleTextWorkflow.inputs.mentionText}`,
  },
);

export default ReplySimpleTextWorkflow;
