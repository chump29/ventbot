import { parse } from "node:path"

import { type Nullable } from "@postfmly/types"

import {
  type Channel,
  type ChatInputCommandInteraction,
  InteractionContextType,
  MessageFlags,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
  type SlashCommandStringOption,
  type TextChannel
} from "discord.js"

import { bucket } from "../../utils/bucket.ts"
import { env } from "../../utils/env.ts"

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
  await interaction.deferReply({ flags: MessageFlags.Ephemeral })

  if (!bucket.allow(interaction.user.username)) {
    await interaction.editReply({ content: "-# > ❌ Rate limit exceeded" })

    return
  }

  if (!interaction.guild) {
    await interaction.editReply({ content: "-# > ❌ Could not get guild" })

    return
  }

  const channel: Nullable<Channel> = await interaction.guild.channels.fetch(env.CHANNEL_ID)
  if (!channel) {
    await interaction.editReply({ content: "-# > ❌ Could not get channel" })

    return
  }

  await (channel as TextChannel).send({
    content: `-# > ${interaction.options.getString("message") as string}`,
    flags: MessageFlags.SuppressNotifications
  })

  await interaction.editReply({ content: "-# > ✅ Anonymous message sent" })
}

export { create, invoke }
