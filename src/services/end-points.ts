import AnnoucementsService from "./annoucements"
import AuthService from "./auth"
import CoursesService from "./courses"
import LessonsService from "./lessons"
import SeasonsService from "./seasons"
import StudentsService from "./students"
import SummariesService from "./summaries"
import UsersService from "./users"

export default class EndPoints {
  public static auth = new AuthService()
  public static user = new UsersService()
  public static course = new CoursesService()
  public static season = new SeasonsService()
  public static lesson = new LessonsService()
  public static annoucement = new AnnoucementsService()
  public static summary = new SummariesService()
  public static student = new StudentsService()
}
