import { Manifest } from "deno-slack-sdk/mod.ts";
import ReplySimpleTextWorkflow from "./src/workflows/reply_simple_text_workflow.ts";
import SampleWorkflow from "./src/workflows/sample_workflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "gmmr",
  description: "メンションされると関連するユーザーのタスクを良い感じに表示してくれる君",
  icon: "assets/icon.png",
  workflows: [SampleWorkflow, ReplySimpleTextWorkflow],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "app_mentions:read",
  ],
});
