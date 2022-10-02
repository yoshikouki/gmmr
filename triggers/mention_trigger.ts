import { Trigger } from "deno-slack-api/types.ts";
import ReplySimpleTextWorkflow from "../workflows/reply_simple_text_workflow.ts";
/**
 * Triggers determine when Workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
 */
const MentionTrigger: Trigger<typeof ReplySimpleTextWorkflow.definition> = {
  type: "event",
  event: {
    event_type: "slack#/events/app_mentioned",
    channel_ids: [""],
  },
  name: "Mention trigger",
  description: "A trigger when the application is mentioned",
  workflow: "#/workflows/reply_simple_text_workflow",
  inputs: {
    channel_id: {
      value: "{{data.channel_id}}",
    },
  },
};

export default MentionTrigger;
