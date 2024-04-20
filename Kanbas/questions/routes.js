import db from "../Database/index.js";
function QuestionRoutes(app) {
    app.delete("/api/questions/:zid", (req, res) => {
        const { zid } = req.params;
        db.questions = db.questions.filter((z) => z._id !== zid);
        res.sendStatus(200);
      });
    app.put("/api/questions/:zid", (req, res) => {
        const { qid } = req.params;
        const questionIndex = db.questions.findIndex(
            (z) => z._id === zid);
        db.questions[questionIndex] = {
            ...db.questions[questionIndex],
            ...req.body
        };
        res.sendStatus(204);
    });
    
    ///api/courses/:cid/quizzes/:qid/questions"
    app.post("/api/quizzes/:qid/questions", (req, res) => {
        // const { cid } = req.params;
        // const newQuiz= {
        //   ...req.body,
        //   course: cid,
        //   _id: new Date().getTime().toString(),
        // };
        // db.quizzes.push(newQuiz);
        // res.send(newQuiz);
        const { qid } = req.params;
        const newQuestion= {
          ...req.body,
          quiz: qid,
          _id: new Date().getTime().toString(),
        };
        db.questions.push(newQuestion);
        res.send(newQuestion);
      });
    
      //"/api/courses/:cid/quizzes"
  app.get("/api/quizzes/:qid/questions", (req, res) => {
    const { qid } = req.params;
    const questions = db.questions
      .filter((z) => z.quiz === qid);
    res.send(questions);
  });
}
export default QuestionRoutes;

