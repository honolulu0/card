// __sports = [
//     {
//         "PropertyId": "22ac0dba-2643-4191-aa44-356e7c913d44",
//         "ChName": "篮球",
//         "EnName": "Basketball",
//         "OtherName": "",

//         "Sort": 10,
//         "PropertyGroup": "",
//         "_id": "9b154580-dd30-4ced-a71e-d5c47e86d612",
//         "CreateUser": "system",
//         "CreateDate": "2022-08-23 17:05:34",
//         "LastUpdateUser": "system",
//         "LastUpdateDate": "2022-08-23 17:05:34"
//     },
//     {
//         "PropertyId": "22ac0dba-2643-4191-aa44-356e7c913d44",
//         "ChName": "橄榄球",
//         "EnName": "Football",
//         "OtherName": "",

//         "Sort": 9,
//         "PropertyGroup": "",
//         "_id": "f64be0b4-6700-4f76-954f-15f75c1a797c",
//         "CreateUser": "system",
//         "CreateDate": "2022-08-23 17:05:36",
//         "LastUpdateUser": "system",
//         "LastUpdateDate": "2022-08-23 17:05:36"
//     },
//     {
//         "PropertyId": "22ac0dba-2643-4191-aa44-356e7c913d44",
//         "ChName": "棒球",
//         "EnName": "Baseball",
//         "OtherName": "",

//         "Sort": 8,
//         "PropertyGroup": "",
//         "_id": "27562d58-a681-4a8c-9903-6509a8a7c894",
//         "CreateUser": "system",
//         "CreateDate": "2022-08-23 17:05:38",
//         "LastUpdateUser": "system",
//         "LastUpdateDate": "2022-08-23 17:05:38"
//     },
//     {
//         "PropertyId": "22ac0dba-2643-4191-aa44-356e7c913d44",
//         "ChName": "冰球",
//         "EnName": "Hockey",
//         "OtherName": "",

//         "Sort": 7,
//         "PropertyGroup": "",
//         "_id": "50abadce-d444-47bf-9d06-64f2957a67b2",
//         "CreateUser": "system",
//         "CreateDate": "2022-08-23 17:05:40",
//         "LastUpdateUser": "system",
//         "LastUpdateDate": "2022-08-23 17:05:40"
//     },
//     {
//         "PropertyId": "22ac0dba-2643-4191-aa44-356e7c913d44",
//         "ChName": "足球",
//         "EnName": "Soccer",
//         "OtherName": "",

//         "Sort": 6,
//         "PropertyGroup": "",
//         "_id": "b8643b03-640c-44b3-bdd6-817e208fb2ff",
//         "CreateUser": "system",
//         "CreateDate": "2022-08-23 17:05:42",
//         "LastUpdateUser": "system",
//         "LastUpdateDate": "2022-08-23 17:05:42"
//     },
//     {
//         "PropertyId": "22ac0dba-2643-4191-aa44-356e7c913d44",
//         "ChName": "UFC",
//         "EnName": "UFC",
//         "OtherName": "",

//         "Sort": 5,
//         "PropertyGroup": "",
//         "_id": "06a4cf7a-e6ef-46df-9e24-0ff2008bd9c4",
//         "CreateUser": "system",
//         "CreateDate": "2022-08-23 17:05:44",
//         "LastUpdateUser": "system",
//         "LastUpdateDate": "2022-08-23 17:05:44"
//     },
//     {
//         "PropertyId": "22ac0dba-2643-4191-aa44-356e7c913d44",
//         "ChName": "WWE",
//         "EnName": "WWE",
//         "OtherName": "",

//         "Sort": 4,
//         "PropertyGroup": "",
//         "_id": "b5bbae14-a98e-4602-a0e7-9e8db56a24ae",
//         "CreateUser": "system",
//         "CreateDate": "2022-08-23 17:05:46",
//         "LastUpdateUser": "system",
//         "LastUpdateDate": "2022-08-23 17:05:46"
//     },
//     {
//         "PropertyId": "22ac0dba-2643-4191-aa44-356e7c913d44",
//         "ChName": "F1",
//         "EnName": "F1",
//         "OtherName": "",

//         "Sort": 3,
//         "PropertyGroup": "",
//         "_id": "074cf602-163f-4100-b3f5-ba591d189777",
//         "CreateUser": "system",
//         "CreateDate": "2022-08-23 17:05:48",
//         "LastUpdateUser": "system",
//         "LastUpdateDate": "2022-08-23 17:05:48"
//     },
//     {
//         "PropertyId": "22ac0dba-2643-4191-aa44-356e7c913d44",
//         "ChName": "网球",
//         "EnName": "Tennis",
//         "OtherName": "",

//         "Sort": 2,
//         "PropertyGroup": "",
//         "_id": "a4bb7547-f7ff-44ab-9a68-bb03448f7e60",
//         "CreateUser": "system",
//         "CreateDate": "2022-08-23 17:05:50",
//         "LastUpdateUser": "system",
//         "LastUpdateDate": "2022-08-23 17:05:50"
//     },
//     {
//         "PropertyId": "22ac0dba-2643-4191-aa44-356e7c913d44",
//         "ChName": "高尔夫",
//         "EnName": "Golf",
//         "OtherName": "",

//         "Sort": 1,
//         "PropertyGroup": "",
//         "_id": "b993b76d-7f3c-4bec-b881-d0a0e1204b97",
//         "CreateUser": "system",
//         "CreateDate": "2022-08-23 17:05:52",
//         "LastUpdateUser": "system",
//         "LastUpdateDate": "2022-08-23 17:05:52"
//     }
// ]
// var sports_dict = {}
// for ( var s of __sports ) {
//     sports_dict[s["ChName"]] = s["EnName"]
// }
// console.log(sports_dict)

var sport_category = {
	"篮球": {
		value: 'Basketball',
		icon: require('../assets/image/chushou/篮球.png')
	},
	"橄榄球": {
		value: 'Football',
		icon: require('../assets/image/chushou/橄榄球.png')
	},
	"棒球": {
		value: 'Baseball',
		icon: require('../assets/image/chushou/棒球.png')
	},
	"冰球": {
		value: 'Hockey',
		icon: require('../assets/image/chushou/冰球.png')
	},
	"足球": {
		value: 'Soccer',
		icon: require('../assets/image/chushou/足球.png')
	},
	"UFC": {
		value: 'UFC',
		icon: require('../assets/image/chushou/拳击.png')
	},
	"WWE": {
		value: 'WWE',
		icon: require('../assets/image/chushou/柔道_摔跤.png')
	},
	"F1": {
		value: 'F1',
		icon: require('../assets/image/chushou/赛车.png')
	},
	"网球": {
		value: 'Tennis',
		icon: require('../assets/image/chushou/网球.png')
	},
	"高尔夫": {
		value: 'Golf',
		icon: require('../assets/image/chushou/_办会家_高尔夫.png')
	}
}
export default sport_category
