# ![VentBot](./utils/images/ventbot.webp) VentBot

> - VentBot for Discord

---

![Bun](https://img.shields.io/badge/Bun-1.4.2-informational?style=plastic&logo=bun "Bun") &nbsp;
![discord.js](https://img.shields.io/badge/discord.js-^14.27.0-informational?style=plastic&logo=discord.js "discord.js")

![CodeQL](https://github.com/chump29/ventbot/workflows/CodeQL/badge.svg "CodeQL") &nbsp;
![Coverage](https://img.shields.io/badge/Coverage-83.03%25-success?style=plastic&logo=jest "Coverage")

![NO AI](https://img.shields.io/badge/NO-AI-orange?style=plastic "NO AI") &nbsp;
![License](https://img.shields.io/github/license/chump29/ventbot?style=plastic&color=blueviolet&label=License&logo=gplv3 "GPLv3") &nbsp; <!-- markdownlint-disable MD013 -->
![CVE Scan](https://img.shields.io/badge/CVE%20Scan-Pass-success?style=plastic&logo=owasp "CVE Scan")

---

### What it does: <!-- markdownlint-disable-line MD001 -->

- Vent anonymously

---

### 🔗 Invite Link

[Add VentBot](https://discord.com/oauth2/authorize?client_id=1546509307103674368&permissions=2048&integration_type=0&scope=bot)

---

### 🖥️ Discord

#### Role Permissions:

| ⚙️ Permissions |
|:--------------:|
|  SendMessages  |

#### Commands:

| 📋 Task |    🔧 Command     |
|:-------:|:-----------------:|
|  Info   |      `/info`      |
|  Ping   |      `/ping`      |
|  Vent   | `/vent <message>` |

---

### 🖧 Docker

#### Environment Variables:

| 📝 Description | 📌 Variable |  {...} Value   |
|:--------------:|:-----------:|:--------------:|
|    Activity    |  ACTIVITY   |    Venting     |
|   Channel ID   | CHANNEL_ID  |     \<id>      |
|  Embed Color   |    COLOR    |    #78866b     |
|     Debug      |    DEBUG    | true/**false** |
|    Bot Name    |    NAME     |    VentBot     |
|   Bot Token    |    TOKEN    |    \<token>    |

##### From `@postfmly/logoserver`:

| 📝 Description | 📌 Variable |    {...} Value    |
|:--------------:|:-----------:|:-----------------:|
|   Logo Name    |  LOGO_NAME  |   ventbot.webp    |
|   Local Path   |  LOGO_PATH  |  ./utils/images   |
|      Port      |  LOGO_PORT  | **Random**/[port] |
|    Logo URL    |  LOGO_URL   |      \<url>       |

##### From `@postfmly/checkrate`:

###### *NOTE: Rate limited to 1 request per 1 second*

#### Deployment:

|  📜 Script  |  🔧 Command   |
|:-----------:|:-------------:|
|    Full     | `./build.sh`  |
| Docker Only | `./docker.sh` |

---

### 📄 Documentation

### Generate:

```bash
./docs.sh
```

---

### 🛰️ Git & CI/CD

- **Pre-Commit:** Staged files are automatically linted
- **Github Actions:** Builds and pushes images to repository
  - latest
    - amd64
    - arm64
