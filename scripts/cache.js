var fs = require('fs');
var path = require('path');
var matter = require('gray-matter');
function postData() {
    var files = fs.readdirSync(path.join('posts'));
    var posts = files.map(function (filename) {
        var slug = filename.replace('.md', '');
        var markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
        var frontmatter = matter(markdownWithMeta).data;
        return {
            slug: slug,
            frontmatter: frontmatter
        };
    });
    return "export const posts = ".concat(JSON.stringify(posts));
}
try {
    fs.readdirSync('cache');
}
catch (error) {
    fs.mkdirSync('cache');
}
fs.writeFile('cache/data.ts', postData(), function (err) {
    if (err)
        return console.log(err);
    console.log('Posts Cached ...');
});
