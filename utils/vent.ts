import { ChannelType, type ChatInputCommandInteraction, type Client, MessageFlags, type TextChannel } from "discord.js"

import { bucket } from "./bucket.ts"
import { env } from "./env.ts"

interface IVentBot {
  init: (client: Client) => Promise<void>
  vent: (interaction: ChatInputCommandInteraction) => Promise<void>
}

class VentBot implements IVentBot {
  private CHANNEL!: TextChannel

  async init(client: Client): Promise<void> {
    const channel = await client.channels.fetch(env.CHANNEL_ID)
    if (channel?.type !== ChannelType.GuildText) {
      throw new Error("Could not get channel")
    }

    this.CHANNEL = channel
  }

  async vent(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral })

    if (!bucket.allow(interaction.user.username)) {
      await interaction.editReply({ content: "-# > ❌ Rate limit exceeded" })

      return
    }

    await this.CHANNEL.send({
      // biome-ignore lint/style/noNonNullAssertion: required
      content: `-# > ${interaction.options.getString("message")!}`,
      flags: MessageFlags.SuppressNotifications
    })

    await interaction.editReply({ content: "-# > ✅ Anonymous message sent" })
  }
}

export const Vent = new VentBot()
