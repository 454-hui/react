import { delay, put, takeEvery, all } from 'redux-saga/effects'
import { mapDispatch } from './Action'
//访问api拿取数据
function* FetchSaga() {
    yield delay(1000)
    const data = yield fetch("http://localhost:8000/find").then(value => {
        return value.json()
    })
    yield put(mapDispatch.FindeAction(data))
}
//传递条件给数据库进行搜索数据。
function* SearchSaga(action) {
    console.log(action + '********')
    const data = yield fetch("http://localhost:8000/search", { method: "POST", body: JSON.stringify(action.payload) })
        .then(res => {
            console.log(res)
            return res.json()
        })
    console.log(data + '-----------')
    yield put(mapDispatch.SearchAction(data))
}

//传递核心数据，通过核心数据删除数据
function* DeleteSage(action) {
    console.log(action)
    fetch('http://localhost:8000/delete', {
        method: "POST",
        body: action.payload.key,
    })
    yield put(mapDispatch.DeteleAction(action.payload))
}


function* watchFetch() {
    yield takeEvery("FETCH", FetchSaga)
    yield takeEvery("SearchFetch", SearchSaga)
    yield takeEvery("DeleteFetch",DeleteSage)
}


export default function* rootSaga() {
    yield all([
        watchFetch(),
    ])
}