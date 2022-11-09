# Tech Blog

## Description

Tech Blog is a CMS application where developers can publish their blog posts and comment on other developers’ posts as well.

Here is the link to the [deployed application]()

### Features

- Easy to use
- Provide options to write, save,edit and delete the posts. can also add comments to the posts.
- Generates a responsive webpage

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Credits](#credits)
- [License](#license)

## Installation

- Create a new repository on your GitHub account.
- Clone this repository.
- Run `npm install`
- Run `mysql -u root -p`
- Run `schema.sql`
- Run `npm start`

## Usage

This project can be used in any web browser or on any devices including the mobile devices.

The following is the demo screenshot of the deployed application.

![Demo screenshot]()

Following is a code snippet of the application page.

Here it refers to the POST Route for posting a new blog post by the user in the blog.

```Node.js
router.post("/post", async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
      created_on: Date.now(),
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


```

## Technologies Used

- Node.js
- Express.js
- MySQL
- Handlebars
- Sequelize
- Heroku
- Bootstrap
- Git
- GitHub

## Credits

- npmjs.com
- MDN / W3Schools

## License

This project is licensed under the [MIT](./LICENSE) license.
