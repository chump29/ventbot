import { parse } from "node:path"

import {
  type ChatInputCommandInteraction,
  InteractionContextType,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
  type SlashCommandStringOption
} from "discord.js"

import { Vent } from "../../utils/vent.ts"

const MAX_LEN: number = 2000

const create = (): RESTPostAPIChatInputApplicationCommandsJSONBody =>
  new SlashCommandBuilder()
    .setName(parse(import.meta.file).name)
    .setDescription("Vent anonymously")
    .addStringOption(
      (option: SlashCommandStringOption): SlashCommandStringOption =>
        option
          .setName("message")
          .setDescription("The anonymous message that you want to send")
          .setMinLength(1)
          .setMaxLength(MAX_LEN)
          .setRequired(true)
    )
    .setContexts(InteractionContextType.Guild)
    .toJSON()

const invoke = async (interaction: ChatInputCommandInteraction): Promise<void> => {
  await Vent.vent(interaction)
}

export { create, invoke }
