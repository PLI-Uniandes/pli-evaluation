# PLI-evaluation

Project to provide a co-evaluation system and keep track of the progress of the users.

[![codebeat badge](https://codebeat.co/badges/fcec924f-c7f8-466b-bbe9-52f247e55cb9)](https://codebeat.co/projects/github-com-pli-uniandes-pli-evaluation-master)

[![codebeat badge](https://codebeat.co/badges/41afa504-fce5-427b-aa17-e82e53231ded)](https://codebeat.co/projects/github-com-pli-uniandes-pli-evaluation-develop)

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