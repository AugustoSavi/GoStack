import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
    console.log('O server do pai ta on na porta 3333');
});
