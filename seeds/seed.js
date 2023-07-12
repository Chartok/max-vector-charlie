const User = require('../models/User');
const Post = require('../models/Post');

const jsonData = [
    { "id": 1, "username": "fgodon0", "password": "kU1)J#tfO~", "post": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque." },
    { "id": 2, "username": "zpizey1", "password": "gO2*>$N!qgb6>", "post": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum." },
    { "id": 3, "username": "bnicholes2", "password": "dY4=)gtEc3", "post": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede." },
    { "id": 4, "username": "ssuff3", "password": "xX9{1YXK'j>U", "post": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem." },
    { "id": 5, "username": "cbuzza4", "password": "eA1(c~'*I", "post": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem." }
];

async function seedDatabase() {
    try {
        await User.sync({ force: true });
        await Post.sync({ force: true });

        // await Post.destroy({ truncate: true, cascade: true });

        const createdUsers = await User.bulkCreate(jsonData.map(data => ({
            username: data.email, // use email as username
            password: data.password
        })));

        const createdPosts = await Post.bulkCreate(jsonData.map(data => ({
            title: 'Post by ${data.first_name} ${data.last_name}',
            body: data.post,
        })));

        console.log('Seeding complete!');
        console.log('Users: ', createdUsers);
        console.log('Posts: ', createdPosts);

    } catch (error) {
        console.error('Error seeding database: ', error);
    }
}

seedDatabase();
