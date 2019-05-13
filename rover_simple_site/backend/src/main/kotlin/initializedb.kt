import org.bson.types.ObjectId
import org.litote.kmongo.*
import org.litote.kmongo.async.*
import kotlin.*
import kotlin.reflect.jvm.internal.impl.load.kotlin.JvmType

data class Sitters(val sitter_email: String?, val sitter_phone_number: String?, val sitter_name: String?, val sitter_overall_rating: Double?, val sitter_rating_rounded: Double?, val sitter_score: Double?, val sitter_image: String?, val sitter_stays: Int?, val sitter_bio: String?, val sitter_history: Array<ObjectId>?)
data class Owners(val owner_email: String, val owner_phone_number: String, val owner_name: String, val owner_dogs: Array<String>, val owner_image: String, val owner_bio: String, val owner_history: Array<ObjectId>)
data class Appointments(val appointment_owner: ObjectId, val appointment_sitter: ObjectId, val appointment_rating: Double, val appointment_startDate: String, val appointment_endDate: String, val appointment_text: String)

fun main() {
    val client = KMongo.createClient()
    val database = client.getDatabase("roverdb")
    val sitter = database.getCollection("sitters")
    val owner = database.getCollection<Owners>()
    val appointments = database.getCollection<Appointments>()
    val sitters = sitter.find()
    database.getCollection<Sitters>().insertOne(Sitters("bobby", null, null, null, null, null, null, null, null, null),null)
    sitter.insertOne("{'name': 'jeff'}")
}
