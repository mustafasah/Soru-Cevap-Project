using AskQuestionProject.Models;
using AskQuestionProject.ViewModel;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web.Http;

namespace AskQuestionProject.Controllers
{

    public class ServicesController : ApiController
    {
        AskQuestionDBEntities db = new AskQuestionDBEntities();
        OperationModel operation = new OperationModel();


        #region Question

        [HttpGet]
        [Route("api/questionlist")]
        public List<QuestionModel> questionList()
        {
            List<QuestionModel> liste = db.QuestionTable.OrderByDescending(o => o.questionId).Select(x => new QuestionModel()
            {
                questionId = x.questionId,
                title = x.title,
                description = x.description,
                photo = x.UserTable.photo,
                date = x.date,
                view = x.view,
                userId = x.userId,
                userName = x.UserTable.userName

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/lastaddsquestionlist/{s}")]
        public List<QuestionModel> lastAddsQuestionList(int s)
        {
            List<QuestionModel> liste = db.QuestionTable.OrderByDescending(o => o.questionId).Take(s).Select(x => new QuestionModel()
            {
                questionId = x.questionId,
                title = x.title,
                description = x.description,
                photo = x.UserTable.photo,
                date = x.date,
                view = x.view,
                userId = x.userId,
                userName = x.UserTable.userName

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/questionlistbyuserid/{userId}")]
        public List<QuestionModel> QuestionTableListeByuserId(int userId)
        {
            List<QuestionModel> liste = db.QuestionTable.Where(s => s.userId == userId).Select(x => new QuestionModel()
            {
                questionId = x.questionId,
                title = x.title,
                description = x.description,
                photo = x.UserTable.photo,
                date = x.date,
                view = x.view,
                userId = x.userId,
                userName = x.UserTable.userName

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/questionbyid/{questionId}")]
        public QuestionModel questionById(int questionId)
        {
            QuestionModel dbres = db.QuestionTable.Where(s => s.questionId == questionId).Select(x => new QuestionModel()
            {
                questionId = x.questionId,
                title = x.title,
                description = x.description,
                photo = x.UserTable.photo,
                date = x.date,
                view = x.view,
                userId = x.userId,
                userName = x.UserTable.userName

            }).SingleOrDefault();

            return dbres;
        }

        [HttpPost]
        [Route("api/addquestion")]
        public OperationModel addQuestion(QuestionModel model)
        {
            if (db.QuestionTable.Count(s => s.title == model.title) > 0)
            {
                operation.control = false;
                operation.message = "Girilen Soru Başlığı Zate Kayıtlıdır!";
                return operation;
            }

            QuestionTable newvr = new QuestionTable();
            newvr.title = model.title;
            newvr.description = model.description;
            newvr.photo = model.photo;
            newvr.view = model.view;
            newvr.date = model.date;
            newvr.userId = model.userId;
            newvr.userName = model.userName;
            db.QuestionTable.Add(newvr);
            db.SaveChanges();

            operation.control = true;
            operation.message = "Sorunuz Başarıyla Eklendi";
            return operation;
        }

        [HttpPut]
        [Route("api/editquestion")]
        public OperationModel editQuestion(QuestionModel model)
        {

            QuestionTable dbres = db.QuestionTable.Where(s => s.questionId == model.questionId).SingleOrDefault();

            if (dbres == null)
            {
                operation.control = false;
                operation.message = "Kayıt Bulunamadı!";
                return operation;
            }
            dbres.title = model.title;
            dbres.description = model.description;
            dbres.photo = model.photo;
            dbres.view = model.view;
            dbres.date = model.date;
            dbres.userId = model.userId;

            db.SaveChanges();

            operation.control = true;
            operation.message = "Soru Düzenlendi";

            return operation;
        }

        [HttpDelete]
        [Route("api/deletequestion/{questionId}")]
        public OperationModel deleteQuestion(int questionId)
        {
            QuestionTable dbres = db.QuestionTable.Where(s => s.questionId == questionId).SingleOrDefault();

            if (dbres == null)
            {
                operation.control = false;
                operation.message = "Kayıt Bulunamadı!";
                return operation;
            }

            if (db.AnswerTable.Count(s => s.questionId == questionId) > 0)
            {
                operation.control = false;
                operation.message = "Üzerinde Cevap Kayıtlı Soru Silinemez!";
                return operation;
            }
            db.QuestionTable.Remove(dbres);
            db.SaveChanges();

            operation.control = true;
            operation.message = "Soru Silindi!";
            return operation;
        }
        #endregion

        #region User


        [HttpGet]
        [Route("api/userlist")]
        public List<UserModel> userList()
        {
            List<UserModel> liste = db.UserTable.Select(x => new UserModel()
            {
                userId = x.userId,
                userName = x.userName,
                email = x.email,
                password = x.password,
                photo = x.photo,
                userIsAdmin = x.userIsAdmin
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/userbyid/{userId}")]
        public UserModel UserTableById(int userId)
        {
            UserModel dbres = db.UserTable.Where(s => s.userId == userId).Select(x => new UserModel()
            {
                userId = x.userId,
                userName = x.userName,
                email = x.email,
                password = x.password,
                photo = x.photo,
                userIsAdmin = x.userIsAdmin

            }).SingleOrDefault();

            return dbres;
        }


        [HttpPost]
        [Route("api/adduser")]
        public OperationModel addUser(UserModel model)
        {
            if (db.UserTable.Count(s => s.userName == model.userName || s.email == model.email) > 0)
            {
                operation.control = false;
                operation.message = "Girilen Kullanıcı Adı veya E-Posta Adresi Zaten Kayıtlıdır!";
                return operation;
            }

            UserTable newvr = new UserTable();
            newvr.userId = model.userId;
            newvr.userName = model.userName;
            newvr.email = model.email;
            newvr.password = model.password;
            newvr.photo = model.photo;
            newvr.userIsAdmin = model.userIsAdmin;

            db.UserTable.Add(newvr);
            db.SaveChanges();

            operation.control = true;
            operation.message = "Kayıt Tamamlandı";
            return operation;
        }


        [HttpPut]
        [Route("api/edituser")]
        public OperationModel editUser(UserModel model)
        {
            UserTable dbres = db.UserTable.Where(s => s.userId == model.userId).SingleOrDefault();
            if (dbres == null)
            {
                operation.control = false;
                operation.message = "Kayıt Bulunamadı";
                return operation;
            }
            dbres.userId = model.userId;
            dbres.userName = model.userName;
            dbres.email = model.email;
            dbres.password = model.password;
            dbres.photo = model.photo;
            dbres.userIsAdmin = model.userIsAdmin;
            db.SaveChanges();

            operation.control = true;
            operation.message = "Kullanıcı Düzenlendi";
            return operation;
        }

        [HttpDelete]
        [Route("api/deleteuser/{userId}")]
        public OperationModel deleteUser(int userId)
        {
            UserTable dbres = db.UserTable.Where(s => s.userId == userId).SingleOrDefault();
            if (dbres == null)
            {
                operation.control = false;
                operation.message = "Kayıt Bulunamadı";
                return operation;
            }

            if (db.QuestionTable.Count(s => s.userId == userId) > 0)
            {
                operation.control = false;
                operation.message = "Soru Sormuş Kullanıcı Silinemez!";
                return operation;
            }

            if (db.AnswerTable.Count(s => s.userId == userId) > 0)
            {
                operation.control = false;
                operation.message = "Herhangi bir Soruya Cevap Vermiş Kullanıcı Silinemez!";
                return operation;
            }

            db.UserTable.Remove(dbres);
            db.SaveChanges();
            operation.control = true;
            operation.message = "Kullanıcı Silindi";
            return operation;
        }

        [HttpPost]
        [Route("api/updateuserphoto")]
        public OperationModel updateUserPhoto(UserPhotoModel model)
        {
            UserTable usr = db.UserTable.Where(s => s.userId == model.userId).SingleOrDefault();
            if (usr == null)
            {
                operation.control = false;
                operation.message = "Kullanıcı Bulunamadı!";
                return operation;
            }

            if (usr.photo != "profil.jpg")
            {
                string path = System.Web.Hosting.HostingEnvironment.MapPath("~/Files/" + usr.photo);
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
            }

            string data = model.photoData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string fileName = usr.userId + model.photoExtention.Replace("image/", ".");

            using (var ms = new MemoryStream(imgbytes, 0, imgbytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Files/" + fileName));
            }
            usr.photo = fileName;
            db.SaveChanges();

            operation.control = true;
            operation.message = "Fotoğraf Güncellendi";

            return operation;
        }

        #endregion

        #region Answer

        [HttpGet]
        [Route("api/answerlist")]
        public List<AnswerModel> answerList()
        {
            List<AnswerModel> liste = db.AnswerTable.Select(x => new AnswerModel()
            {

                answerId = x.answerId,
                description = x.description,
                date = x.date,
                questionId = x.questionId,
                title = x.QuestionTable.title,
                userId = x.userId,
                userName = x.UserTable.userName

            }).ToList();
            return liste;

        }
        [HttpGet]
        [Route("api/lastaddsanswerlist/{s}")]
        public List<AnswerModel> lastAddsAnswerList(int s)
        {
            List<AnswerModel> liste = db.AnswerTable.OrderByDescending(o => o.answerId).Take(s).Select(x => new AnswerModel()
            {

                answerId = x.answerId,
                description = x.description,
                date = x.date,
                questionId = x.questionId,
                title = x.QuestionTable.title,
                userId = x.userId,
                userName = x.UserTable.userName

            }).ToList();
            return liste;

        }
        [HttpGet]
        [Route("api/answerlistbyquestionid/{questionId}")]
        public List<AnswerModel> answerListByQuestionId(int questionId)
        {
            List<AnswerModel> liste = db.AnswerTable.Where(s => s.questionId == questionId).OrderByDescending(o => o.answerId).Select(x => new AnswerModel()
            {

                answerId = x.answerId,
                description = x.description,
                date = x.date,
                questionId = x.questionId,
                title = x.QuestionTable.title,
                userId = x.userId,
                userName = x.UserTable.userName,
                photo = x.UserTable.photo

            }).ToList();
            return liste;

        }
        [HttpGet]
        [Route("api/answerlistbyuserid/{userId}")]
        public List<AnswerModel> answerListByUserId(int userId)
        {
            List<AnswerModel> liste = db.AnswerTable.Where(s => s.userId == userId).Select(x => new AnswerModel()
            {

                answerId = x.answerId,
                description = x.description,
                date = x.date,
                questionId = x.questionId,
                title = x.QuestionTable.title,
                userId = x.userId,
                userName = x.UserTable.userName

            }).ToList();
            return liste;

        }
        [HttpGet]
        [Route("api/answerbyid/{answerId}")]
        public AnswerModel answerById(int answerId)
        {
            AnswerModel dbres = db.AnswerTable.Where(s => s.answerId == answerId).Select(x => new AnswerModel()
            {

                answerId = x.answerId,
                description = x.description,
                date = x.date,
                questionId = x.questionId,
                title = x.QuestionTable.title,
                userId = x.userId,
                userName = x.UserTable.userName

            }).SingleOrDefault();

            return dbres;

        }

        [HttpPost]
        [Route("api/addanswer")]
        public OperationModel addAnswer(AnswerModel model)
        {
            if (db.AnswerTable.Count(s => s.description == model.description && s.questionId == model.questionId && s.userId == model.userId) > 0)
            {
                operation.control = false;
                operation.message = "Aynı Kişi, Aynı Soruya Aynı Cevabı Yazamaz!";
                return operation;
            }

            AnswerTable newvr = new AnswerTable();
            newvr.description = model.description;
            newvr.date = model.date;
            newvr.userId = model.userId;
            newvr.questionId = model.questionId;

            db.AnswerTable.Add(newvr);
            db.SaveChanges();

            operation.control = true;
            operation.message = "Cevap Eklendi";

            return operation;
        }

        [HttpPut]
        [Route("api/editanswer")]
        public OperationModel editAnswer(AnswerModel model)
        {
            AnswerTable dbres = db.AnswerTable.Where(s => s.answerId == model.answerId).SingleOrDefault();

            if (dbres == null)
            {
                operation.control = false;
                operation.message = "Kayıt Bulunamadı";
                return operation;
            }

            dbres.description = model.description;
            dbres.date = model.date;
            dbres.userId = model.userId;
            dbres.questionId = model.questionId;


            db.SaveChanges();

            operation.control = true;
            operation.message = "Cevap Düzenlendi";
            return operation;
        }

        [HttpDelete]
        [Route("api/deleteanswer/{answerId}")]
        public OperationModel deleteAnswer(int answerId)
        {

            AnswerTable dbres = db.AnswerTable.Where(s => s.answerId == answerId).SingleOrDefault();

            if (dbres == null)
            {
                operation.control = false;
                operation.message = "Kayıt Bulunamadı";
                return operation;
            }

            db.AnswerTable.Remove(dbres);

            db.SaveChanges();

            operation.control = true;
            operation.message = "Cevap Silindi";
            return operation;
        }
        #endregion
    }
}
