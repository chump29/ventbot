import { parse } from "node:path"

import { checkRate } from "@postfmly/checkrate"
import { error } from "@postfmly/logger"
import { type Nullable } from "@postfmly/types"

import {
  type ChatInputCommandInteraction,
  InteractionContextType,
  MessageFlags,
  PermissionFlagsBits,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
  type SlashCommandStringOption,
  type TextBasedChannel,
  type TextChannel
} from "discord.js"

const create = (): RESTPostAPIChatInputApplicationCommandsJSONBody =>
  new SlashCommandBuilder()
    .setName(parse(import.meta.filename).name)
    .setDescription("Anonymously vent")
    .addStringOption(
      (option: SlashCommandStringOption): SlashCommandStringOption =>
        option.setName("message").setDescription("The anonymous message that you want to send").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .setContexts(InteractionContextType.Guild)
    .toJSON()

const invoke = async (interaction: ChatInputCommandInteraction): Promise<void> => {
  if (await checkRate(interaction)) {
    return
  }

  const channel: Nullable<TextBasedChannel> = interaction.channel
  if (!channel) {
    error(`Channel not found for ${interaction.user.displayName}'s anonymous message`)

    return
  }

  await (channel as TextChannel)
    .send({
      content: `-# > ${interaction.options.getString("message")}`,
      flags: MessageFlags.SuppressNotifications
    })
    .then(() =>
      interaction.reply({
        content: "-# > Anonymous message sent",
        flags: MessageFlags.Ephemeral
      })
    )
}

export { create, invoke }
