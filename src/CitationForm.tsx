import React, { useState, useEffect } from 'react';
import citationExamples from './citation-examples.json';

interface CitationFormProps {}

const CitationForm: React.FC<CitationFormProps> = () => {
  const [citationType, setCitationType] = useState('horizontal');
  const [isBook, setIsBook] = useState(false);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [volume, setVolume] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [publisher, setPublisher] = useState('');
  const [selectedExample, setSelectedExample] = useState('');

  useEffect(() => {
    if (selectedExample) {
      const example = citationExamples.find((item) => item.title === selectedExample);
      if (example) {
        setIsBook(example.isBook || false);
        setAuthor(example.author);
        setTitle(example.title);
        setJournal(example.journal || '');
        setVolume(example.volume || '');
        setYear(example.year);
        setPages(example.pages || '');
        setPublisher(example.publisher || '');
      }
    }
  }, [selectedExample]);

  const generateCitation = () => {
    if (isBook) {
      if (citationType === 'horizontal') {
        const citation = `${author}(${year})『${title}』${publisher}`;
        return citation;
      } else {
        const citation = `${author}『${title}』${publisher}、${year}年`;
        return citation;
      }
    } else {
      if (citationType === 'horizontal') {
        const citation = `${author}(${year})「${title}」『${journal}』${volume}：${pages} ${publisher}`;
        return citation;
      } else {
        const citation = `${author}「${title}」『${journal}』${volume}、${year}年${pages && `(${pages}頁)`}`;
        return citation;
      }
    }
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="horizontal"
            checked={citationType === 'horizontal'}
            onChange={(e) => setCitationType(e.target.value)}
          />
          横式
        </label>
        <label>
          <input
            type="radio"
            value="vertical"
            checked={citationType === 'vertical'}
            onChange={(e) => setCitationType(e.target.value)}
          />
          直式
        </label>
      </div>
      <div>
        <label>
          選取範例：
          <select value={selectedExample} onChange={(e) => setSelectedExample(e.target.value)}>
            <option value="">-- 請選擇 --</option>
            {citationExamples.map((example) => (
              <option key={example.title} value={example.title}>
                {example.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isBook}
            onChange={(e) => setIsBook(e.target.checked)}
          />
          是否為書籍
        </label>
      </div>
      <div>
        <label>作者：</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      {!isBook && (
        <div>
          <label>論文/文章標題：</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      )}
      {!isBook && (
        <div>
          <label>發表刊物名稱：</label>
          <input type="text" value={journal} onChange={(e) => setJournal(e.target.value)} />
        </div>
      )}
      {!isBook && (
        <div>
          <label>卷號或期號：</label>
          <input type="text" value={volume} onChange={(e) => setVolume(e.target.value)} />
        </div>
      )}
      <div>
        <label>發表年份：</label>
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      {!isBook && citationType === 'horizontal' && (
        <div>
          <label>頁碼範圍：</label>
          <input type="text" value={pages} onChange={(e) => setPages(e.target.value)} />
        </div>
      )}
      {!isBook && citationType === 'vertical' && (
        <div>
          <label>頁碼範圍：</label>
          <input type="text" value={pages} onChange={(e) => setPages(e.target.value)} />
        </div>
      )}
      {isBook && (
        <div>
          <label>書名：</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      )}
      {isBook && (
        <div>
          <label>出版社：</label>
          <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
        </div>
      )}
      <div>
        <h3>生成的註解：</h3>
        <p>{generateCitation()}</p>
      </div>
    </div>
  );
};

export default CitationForm;