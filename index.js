import app from './app';
const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`App listening on port ${port}!`));
