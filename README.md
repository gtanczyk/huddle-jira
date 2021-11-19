# Huddle in Jira

Audio chat and screen sharing at your fingertips directly in Jira tickets powered by Dolby.io. Got an incident? Hot support case? Planning work on an epic? Click to start conversation with your team.

![Kapture 2021-11-19 at 09 55 51](https://user-images.githubusercontent.com/1281113/142595336-898af740-861c-4560-a7d5-e424fdee6f24.gif)

Installation url: https://developer.atlassian.com/console/install/f55f2c16-ec13-4e69-84af-c187790201c1?signature=e1747bac288da54260584fe0e44a74c907e47d8f0870d4752d1c4e92ba663dfa&product=jira

### Nasty workaround for the screen share/full screen problem in Atlassian Forge

This app is suffering from two limitations of Atlassian Forge:

- [FRGE-555: no access to display-capture](https://ecosystem.atlassian.net/browse/FRGE-555)
- [FRGE-534: preventing full screen access](https://ecosystem.atlassian.net/browse/FRGE-534)

Hopefully it will be resolved very soon, and we can remove those two workarounds:

- [screen share in new window](packages/frontend/src/pages/screen-sharing-page.tsx)
- [full screen in new window](packages/frontend/src/pages/screen-watching-page.tsx)
