# PLI-evaluation

Project to provide a co-evaluation system and keep track of the progress of the users.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/83b05ddd14d54560abe3743ef95d910d)](https://www.codacy.com/app/pli-evaluation/pli-evaluation?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=PLI-Uniandes/pli-evaluation&amp;utm_campaign=Badge_Grade)

# Configuration

Setup env variables for client (env var `PLI_CLIENT`) and secret (env `PLI_SECRET`) of the [Microsoft/Office365](https://apps.dev.microsoft.com/#/appList) app and a list of emails (separeted by spaces `' '`) that you want for admin users (env var `ADMIN_USERS`).

# Used resources

* [Boilerplate for structure: meteor-react-boilerplate](https://github.com/AdamBrodzinski/meteor-react-boilerplate)

* [accounts-office365](https://github.com/lindoelio/meteor-accounts-office365)

* [meteor-roles](https://github.com/alanning/meteor-roles)

* [bootstrap](https://github.com/twbs/bootstrap)

* [SurveyJS Library](https://surveyjs.io/Overview/Library/)

* [SurveyJS Editor (Builder)](https://surveyjs.io/Licenses#BuildSurvey). [Attribution-NonCommercial 3.0 Unported (CC BY-NC 3.0)](https://creativecommons.org/licenses/by-nc/3.0/). No changes where made.

And more (see [packages](./.meteor/packages) and [package.json](./package.json))