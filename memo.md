# Memo

## DB

### 項目精査

* スレタイトル
* コメントNo
* コメント内容
* ~~コメントユーザー~~
* ~~コメント時間~~
* ~~コメントID~~
* コメント編集履歴

### DB設計

#### ThreadList

```sql
create table ThreadList (
    id mediumint not null primary key,
    name char(100),
    create_date timestamp
);
```

| 項目名 | データ型 | 備考 |
| --- | --- | --- |
| id | mediumint | スレッドID |
| name | char(100) | スレッドタイトル |
| create_date | timestamp | スレッド作成日 |

```sql
# テストデータ挿入
insert into ThreadList (id, name, create_date) values (1, 'test thread name', '2021-08-01 00:00:01.000000');
```

#### CommentList

```sql
create table CommentList (
    id mediumint not null auto_increment primary key,
    thread_id mediumint not null,
    comment varchar(3000),
    post_date timestamp,
    edited boolean,
    foreign key (thread_id)
    references ThreadList(id)
);
```

| 項目名 | データ型 | 備考 |
| --- | --- | --- |
| id | auto_increment | 主キー |
| thread_id | mediumint | スレッドID（外部キー） |
| comment | varchar(3000) | コメント内容 |
| post_date | timestamp | 投稿日 |
| edited | boolean | 編集フラグ |

```sql
# テストデータ挿入
insert into CommentList (
    thread_id, comment, post_date, edited)
    values (
        1, 
        'test comment heyheyhey!', 
        '2021-08-01 00:00:01.000001',
        false
    );
```

## Docker

```bash
# frontend bash
docker exec -it express-mysql-5chan-demo_frontend_1 bash

# app bash
docker exec -it express-mysql-5chan-demo_app_1 bash

# mysql access
docker-compose exec mysql mysql -uroot -p
```

## 参考記事

Express × MySQL環境構築：https://note.com/kawa1228/n/nb18e19fbf4cc  
DB接続：https://zenn.dev/ryota_koba04/scraps/1556360172954c
Express API作成：https://qiita.com/tamura_CD/items/e3abdab9b8c5aa35fa6b
React × Express連携：https://www.to-r.net/media/docer-cra/  