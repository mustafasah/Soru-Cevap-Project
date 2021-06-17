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
    
    public partial class QuestionTable
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public QuestionTable()
        {
            this.AnswerTable = new HashSet<AnswerTable>();
        }
    
        public int questionId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string photo { get; set; }
        public DateTime date { get; set; }
        public int userId { get; set; }
        public int view { get; set; }
        public string userName { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AnswerTable> AnswerTable { get; set; }
        public virtual UserTable UserTable { get; set; }
    }
}
