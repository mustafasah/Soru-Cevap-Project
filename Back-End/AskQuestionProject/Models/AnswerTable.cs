//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AskQuestionProject.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class AnswerTable
    {
        public int answerId { get; set; }
        public string description { get; set; }
        public int userId { get; set; }
        public int questionId { get; set; }
        public DateTime date { get; set; }
    
        public virtual QuestionTable QuestionTable { get; set; }
        public virtual UserTable UserTable { get; set; }
    }
}
