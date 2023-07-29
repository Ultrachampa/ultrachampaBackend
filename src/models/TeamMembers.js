import { Schema, model } from "mongoose";

const TeamMembersSchema = new Schema({
  user: [{ ref: "User", type: Schema.Types.ObjectId, required: true }],
  team: [{ ref: "Team", type: Schema.Types.ObjectId, required: true }],
});

export default model("TeamMembers", TeamMembersSchema);
