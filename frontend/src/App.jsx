import { useState, useEffect } from 'react';
import api, { ensureGuestAuth } from './lib/api';

import './App.css';
import Header from './components/Header';
import Input from './components/Input';
import List from './components/List';

function App() {
  const [buckets, setBuckets] = useState([]);
  const [loading, setLoading] = useState(false);
  const API = 'buckets'; // baseURL에 이미 /api 포함되어 있으므로 앞에 슬래시 X

  const fetchBuckets = async () => {
    try {
      setLoading(true);
      await ensureGuestAuth();           // POST /api/auth/guest
      const res = await api.get(API);    // GET  /api/buckets
      const data = Array.isArray(res.data) ? res.data : (res.data?.buckets ?? []);
      setBuckets(data);
    } catch (error) {
      console.error('가져오기 실패', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuckets(); // 최초 1회만 호출
  }, []);

  const onCreate = async (bucketText) => {
    const text = bucketText?.trim();
    if (!text) return;
    try {
      const res = await api.post(API, { text }); // POST /api/buckets
      const created = res.data?.bucket ?? res.data;
      if (Array.isArray(res.data?.buckets)) setBuckets(res.data.buckets);
      else setBuckets((prev) => [created, ...prev]);
    } catch (error) {
      console.log('추가 실패', error);
    }
  };

  const onDelete = async (id) => {
    try {
      if (!confirm('정말 삭제할까요?')) return;
      const { data } = await api.delete(`${API}/${id}`); // DELETE /api/buckets/:id
      if (Array.isArray(data?.buckets)) return setBuckets(data.buckets);
      const deletedId = data?.deleted ?? data?.deletedId ?? data?.bucket?._id ?? data?._id ?? id;
      setBuckets((prev) => prev.filter((t) => t._id !== deletedId));
    } catch (error) {
      console.error('삭제 실패', error);
    }
  };

  const onUpdateChecked = async (id, next) => {
    try {
      const { data } = await api.patch(`${API}/${id}/check`, { checked: next });
      if (Array.isArray(data?.buckets)) setBuckets(data.buckets);
      else {
        const updated = data?.bucket ?? data;
        setBuckets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      }
    } catch (error) {
      console.error('체크 상태 업데이트 실패', error);
    }
  };

  const onUpdateText = async (id, next) => {
    const value = next?.trim();
    if (!value) return;
    try {
      const { data } = await api.patch(`${API}/${id}/text`, { text: value });
      if (Array.isArray(data?.buckets)) setBuckets(data.buckets);
      else {
        const updated = data?.bucket ?? data;
        setBuckets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      }
    } catch (error) {
      console.error('텍스트 수정 실패', error);
    }
  };

  const onUpdateBucket = async (id, next) => {
    try {
      const { data } = await api.put(`${API}/${id}`, next);
      const updated = data?.updated ?? data?.bucket ?? data;
      setBuckets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (error) {
      console.error('Bucket update 실패', error);
    }
  };

  return (
    <div className="App">
      <Header />
      <Input onCreate={onCreate} />
      {loading && <p style={{padding: 8}}>불러오는 중...</p>}
      <List
        buckets={Array.isArray(buckets) ? buckets : []}
        onUpdateChecked={onUpdateChecked}
        onUpdateBucket={onUpdateBucket}
        onDelete={onDelete}
      />
    </div>
  );
}

export default App;