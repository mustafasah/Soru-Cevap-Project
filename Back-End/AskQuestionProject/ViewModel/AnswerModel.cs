using System;

namespace AskQuestionProject.ViewModel
{
    public class AnswerModel
    {
        public int answerId { get; set; }
        public string description { get; set; }
        public int userId { get; set; }
        public string userName { get; set; }
        public string photo { get; set; }
        public int questionId { get; set; }
        public string title { get; set; }
        public DateTime date { get; set; }
    }
}
