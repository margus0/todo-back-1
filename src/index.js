const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {
  insertTodoDb,
  getDataFromDb,
  updateTask,
  deleteTask,
} = require('./models/todoModel');
const { validateTodo } = require('./middleware/validation');
require('dotenv').config();

const app = express();
const { serverPort } = require('./dbConfigs');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const router = express.Router();

router.post('/', validateTodo, async (req, res) => {
  try {
    const insertResult = await insertTodoDb(req.body);
    if (insertResult.affectedRows) {
      return res.send({ msg: 'Success' });
    }
    return res.send(insertResult);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const foundData = await getDataFromDb();
    return res.json(foundData);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await updateTask(req.body, req.params.id);
    if (result.affectedRows) {
      return res.send({ msg: 'Update successful' });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteTask(id);
    if (result.affectedRows) {
      return res.send({ msg: 'Delete successful' });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.use('/', router);

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
