import React, { useEffect, useState, useRef } from 'react';
import styles from './search.module.css';

let timer: string | number | NodeJS.Timeout | undefined;
export default function SearchComp() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const lastTitleObserver = useRef<null| IntersectionObserver>(null);

    console.log("oberser: ", lastTitleObserver);

    const lastElement = (node: any) => {
        if(loading) return;
        if(lastTitleObserver.current) lastTitleObserver?.current?.disconnect;

        lastTitleObserver.current = new IntersectionObserver((entries) => {
            console.log("in", entries);
            if (entries[0].isIntersecting && hasMore) {
              setPage((prevPageNumber) => prevPageNumber + 1);
            }
        });

        console.log("node", node);
        if (node) lastTitleObserver.current && lastTitleObserver.current.observe(node);
    }

    useEffect(() => {
        setLoading(true);

        const getSearchItems = async () => {
            if(query) {
                const response = await fetch(`http://openlibrary.org/search.json?title=${query}&page=${page}`);
                let data = await response.json();
                console.log(data);
                setHasMore(data.docs.length > 0);

                setData((prevData) => {
                    console.log([[...prevData, ...data.docs.map((b: any) => b.title)]])
                    return [
                        ...prevData, ...data.docs.map((b: any) => b.title)
                    ];
                  });
                // setData([...data.docs.map((b: any) => b.title)])
            }
            setLoading(false);
        }

        getSearchItems();
    }, [query, page])

    const handleChange = (e: React.ChangeEvent) => {

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            const element = e.target as HTMLInputElement
            setData([]);
            setQuery(element.value);
            setPage(1);
        }, 800)
    }

  return (
    <div className={styles.searchContainer}>

        <input type={"text"}  onChange={handleChange} />

        {
            data.map((title, index) => {
                if(data.length === index + 1) {
                    return (
                        <div ref={lastElement} className={styles.searchTitle} key={index}>
                            {title}
                        </div>
                    )
                } else {
                    return (
                        <div className={styles.searchTitle} key={index}>
                            {title}
                        </div>
                    )
                }
            })
        }

        <div>{loading && "Loading..."}</div>
    </div>
  )
}
