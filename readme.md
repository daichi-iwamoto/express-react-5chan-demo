## Database

### ThreadList
> スレッド一覧のDatabase

| 項目名 | データ型 | 備考 |
| --- | --- | --- |
| id | mediumint not null auto_increment primary key | スレッドID / 主キー |
| name | char(100) | スレッドタイトル |
| create_date | timestamp | スレッド作成日 |

### CommentList
> コメント一覧のDatabase

| 項目名 | データ型 | 備考 |
| --- | --- | --- |
| id | mediumint not null auto_increment primary key | 主キー |
| thread_id | mediumint not null | スレッドID / 外部キー（ThreadListのid） |
| comment | varchar(3000) | コメント内容 |
| post_date | timestamp | 投稿日 |
| edited | boolean | 編集済フラグ |

## 制作の過程で学んだこと、感じたこと

### インフラの知識不足
今回の実装でインフラ周りの経験や知識が足りないという  
自身の課題を再確認しました。具体的には下記の様な事がありました。

#### 環境構築に時間がかかる
`Docker`での実務経験が少ない為、自分で環境構築を行うのが大変でした。  
環境構築で丸1日程使ってしまいかなり時間を取られましたが、  
実装に入ってしまえばそこまで詰まることもなく進められ、  
約3日程で現在の状態まで作成することができました。

#### フロントとバックの切り分け
着手段階では`Express`と`React`を別サーバに置き、  
`Express`を`API`として使用しようとしたのですが、  
ローカル環境での疎通がうまくいかず断念し、同一サーバ内で動かすように切り替えました。

#### DockerでのMySQLの設定
`Docker`での`MySQL`はデフォルトでは日本語の入力ができないようで、  
現状、書き込み・編集共に日本語を登録しようとするとエラーになってしまいます。  
こちらも、最初は`post`の仕方が悪いのかと試行錯誤行い、`Express`の方で`post`の値を  
確認したのですが、問題がなさそうという事で調べていくうちに  
サーバーの設定の問題だという事に気付きました。  
通常のサーバーとは違い`Dockerfile`での設定が必要との事で、現在も調査中です。

### Reactのコンポーネント分割が難しい
こちらも実務経験の無さが顕著に出たと感じました。  
特に、「新規投稿」と「投稿編集」のポップアップはデザインも。`post`の内容も殆ど同じなので  
テキスト部分だけ`Props`で渡しDOMのは共通コンポーネントととして使い回しができた気がしまます。  
また、「[Thread.js](https://github.com/daichi-iwamoto/express-react-5chan-demo/blob/master/web/client/src/Conponents/Thread.js)」のコード量が割と多くなってしまい、わかりづらくなってしまいました。  
その他にも、「[index.js](https://github.com/daichi-iwamoto/express-react-5chan-demo/blob/master/web/client/src/index.js)」では「[Thread.js](https://github.com/daichi-iwamoto/express-react-5chan-demo/blob/master/web/client/src/Conponents/Thread.js)」と「[Header.js](https://github.com/daichi-iwamoto/express-react-5chan-demo/blob/master/web/client/src/Conponents/Header.js)」のみを読み込むようにしてあるのですが、  
そもそもこの構造でよいのか等、悩むところが多々ありました。

### Redux等の状態管理システムの導入の線引きが難しい
今回のアプリでは子コンポーネントにいくつかの`state`だったり`setState`を  
渡していますが、この程度のものであれば`Redux`は必要ないかと感じました。