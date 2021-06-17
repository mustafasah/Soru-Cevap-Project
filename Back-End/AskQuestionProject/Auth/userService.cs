using AskQuestionProject.Models;
using AskQuestionProject.ViewModel;
using System.Linq;

namespace AskQuestionProject.Auth
{
    public class userService
    {
        AskQuestionDBEntities db = new AskQuestionDBEntities();
        public UserModel userSingIn(string uname, string password)
        {
            UserModel user = db.UserTable.Where(s => s.userName == uname && s.password == password).Select(x => new UserModel()
            {
                userId = x.userId,
                userName = x.userName,
                email = x.email,
                password = x.password,
                photo = x.photo,
                userIsAdmin = x.userIsAdmin

            }).SingleOrDefault();
            return user;
        }
    }
}
