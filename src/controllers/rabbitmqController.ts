import Log from "../models/Log";

async function handleIncomingQueue(data: any) {
  try {
    console.log(data);
    // await Log.create({ phase: "adapter", data: data });
    // do the myob intergration here
  } catch (error) {
    console.log(error);
  }
}

const rabbitmqController = {
  handleIncomingQueue,
};
export default rabbitmqController;
