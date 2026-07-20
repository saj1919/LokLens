/* Resolved MP portraits (Wikimedia Commons, via Wikipedia PageImages API).
   3 MPs have no free-licensed portrait on Wikipedia and fall back to initials:
   abhishek-banerjee, karti-chidambaram, dushyant-singh. */
const PHOTOS = {
  "narendra-modi": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/The_official_portrait_of_Shri_Narendra_Modi%2C_the_Prime_Minister_of_the_Republic_of_India.jpg/250px-The_official_portrait_of_Shri_Narendra_Modi%2C_the_Prime_Minister_of_the_Republic_of_India.jpg",
  "rahul-gandhi": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Rahul_Gandhi.png/330px-Rahul_Gandhi.png",
  "amit-shah": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Shri_Amit_Shah_in_Raigad.jpg/330px-Shri_Amit_Shah_in_Raigad.jpg",
  "rajnath-singh": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Shri_Rajnath_Singh%2C_in_New_Delhi_on_May_09%2C_2023_%28cropped%29.jpg/330px-Shri_Rajnath_Singh%2C_in_New_Delhi_on_May_09%2C_2023_%28cropped%29.jpg",
  "nitin-gadkari": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nitin_Jairam_Gadkari.jpg/330px-Nitin_Jairam_Gadkari.jpg",
  "shashi-tharoor": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Shashi_Tharoor_2025.jpg/330px-Shashi_Tharoor_2025.jpg",
  "priyanka-gandhi-vadra": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Priyanka_Gandhi_Vadra_%287%29.jpg/330px-Priyanka_Gandhi_Vadra_%287%29.jpg",
  "asaduddin-owaisi": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Asaduddin.jpg/330px-Asaduddin.jpg",
  "supriya-sule": "https://upload.wikimedia.org/wikipedia/commons/0/07/Supriya_Sule.png",
  "mahua-moitra": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Mahua_Moitra.jpg/330px-Mahua_Moitra.jpg",
  "kanimozhi-karunanidhi": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Kanimozhi_Karunanidhi_01.jpg/250px-Kanimozhi_Karunanidhi_01.jpg",
  "akhilesh-yadav": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Akhilesh_Yadav_receiving_Padma_Vibhushan_on_the_behalf_of_his_late_father_Sh._Mulayam_Singh_Yadav_%28cropped%29.jpg/330px-Akhilesh_Yadav_receiving_Padma_Vibhushan_on_the_behalf_of_his_late_father_Sh._Mulayam_Singh_Yadav_%28cropped%29.jpg",
  "dimple-yadav": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Dimple_Yadav.img.jpg/330px-Dimple_Yadav.img.jpg",
  "jyotiraditya-scindia": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/H20250428182531.jpg/330px-H20250428182531.jpg",
  "piyush-goyal": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Piyush_Goyal_crop.jpg/330px-Piyush_Goyal_crop.jpg",
  "hema-malini": "https://upload.wikimedia.org/wikipedia/commons/3/39/Hema_Malini%27s_75th_birthday_celebration.jpg",
  "kangana-ranaut": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Kangana_Ranaut_at_Ira_Khan%27s_wedding_reception_%28cropped%29.jpg/330px-Kangana_Ranaut_at_Ira_Khan%27s_wedding_reception_%28cropped%29.jpg",
  "ravi-kishan": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Ravi_Kissen_at_the_launch_of_T_P_Aggarwal%27s_trade_magazine_%27Blockbuster%27_20.jpg/330px-Ravi_Kissen_at_the_launch_of_T_P_Aggarwal%27s_trade_magazine_%27Blockbuster%27_20.jpg",
  "chirag-paswan": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/The_Union_Minister_of_Food_Processing_Industries%2C_Shri_Chirag_Paswan_chaired_a_Curtain_Raiser_Press_Conference_on_%E2%80%9CWorld_Food_India-2024%E2%80%9D_%E2%80%93_in_New_Delhi_on_June_19%2C_2024_%28Cropped%29.jpg/330px-thumbnail.jpg",
  "tejasvi-surya": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Tejasvi_Surya.jpg/250px-Tejasvi_Surya.jpg",
  "dharmendra-pradhan": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Dharmendra_Pradhan%2C_Minister_of_Education.jpg/330px-Dharmendra_Pradhan%2C_Minister_of_Education.jpg",
  "misa-bharti": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Misa_Bharti.jpg",
  "bansuri-swaraj": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Bansuri_Swaraj_in_June_2024.jpg/330px-Bansuri_Swaraj_in_June_2024.jpg",
  "gaurav-gogoi": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Gaurav_Gogoi_2024_%28cropped%29.jpg/330px-Gaurav_Gogoi_2024_%28cropped%29.jpg",
  "kumari-selja": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Kumari_Selja.jpg/330px-Kumari_Selja.jpg",
  "shatrughan-sinha": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Shatrughan_Sinha.jpg/330px-Shatrughan_Sinha.jpg",
  "nishikant-dubey": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Nishikant_Dubey_-_Kolkata_2017-07-10_3371.JPG/330px-Nishikant_Dubey_-_Kolkata_2017-07-10_3371.JPG",
  "kiren-rijiju": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Kiren_Rijiju_with_Modi_%28cropped%29.jpg/330px-Kiren_Rijiju_with_Modi_%28cropped%29.jpg",
  "harsimrat-kaur-badal": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Harsimrat_Kaur_Badal.jpg/250px-Harsimrat_Kaur_Badal.jpg",
  "om-birla": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Om_Birla_%282021%29_%28cropped%29.jpg/330px-Om_Birla_%282021%29_%28cropped%29.jpg",
  "manohar-lal-khattar": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Manohar_Lal%2C_Minister_of_Power.jpg/330px-Manohar_Lal%2C_Minister_of_Power.jpg",
  "shivraj-singh-chouhan": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Shivraj_Singh_Chouhan_2025.jpg/330px-Shivraj_Singh_Chouhan_2025.jpg"
};
if (typeof module !== "undefined") { module.exports = { PHOTOS }; }
