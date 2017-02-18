// Example initial data
// Remove '_' from file name to use this

exports.users = [
    {username: "username", password: "password"}
];

exports.files = [
    {name: "Visible file name", filename: "file name in frontend/app/assets/files folder"}
];

exports.links = [
    {name: "Visible link text", url: "url"}
];

exports.projects = [
    {
        name: "Test project",
        startTime: "2015-01-01T00:00:00.000Z",
        endTime: "2015-01-01T00:00:00.000Z",
        type: "Test type",
        shortDescription: "Description",
        description: "Description",
        tags: ["tag1", "tag2"],
        link: {name: "Visible link text", url: "url"},
        images: ["image_name"]
    }
];