<?exit?>

DROP TABLE IF EXISTS MC_BBS;
CREATE TABLE MC_BBS (
  seq bigint NOT NULL auto_increment,
  section char(1) default '1',  -- 처음 나오게 2 아니면 1
  cla char(1) default 'c',  -- c 일반  s 스타
  cate1 int,
  cate2 int,
  title varchar(200),
  unm varchar(50),
  utel varchar(50),
  attach1 varchar(200),
  attach2 varchar(200),
  attach3 varchar(200),
  thumb1 varchar(200),
  thumb2 varchar(200),
  thumb3 varchar(200),
  filename1 varchar(200),
  filename2 varchar(200),
  filename3 varchar(200),
  list1 varchar(200),
  filename5 varchar(200),
  afile varchar(200),
  filename4 varchar(200),
  ulink varchar(255),
  content text,
  gmarketseq int,
  downqty int default 0,
  gmarketurl varchar(255),
  ip varchar(15),
  status char(1) default 'n',   -- 검사후 y
  input_date datetime,
  del_yn char(1) default 'n' ,
  del_date datetime,
  del_id varchar(20),
  view_yn char(1) default 'n',
  ranking int default 999,
  PRIMARY KEY  (seq)
)CHARSET=utf8   ;


create index IDX_MC_BBS_DEL_YN on MC_BBS (del_yn);
create index IDX_MC_BBS_CLA on MC_BBS (cla);
create index IDX_MC_BBS_GMARKETSEQ on MC_BBS (gmarketseq);
create index IDX_MC_BBS_VIEWYN on MC_BBS (view_yn);
create index IDX_MC_BBS_STATUS on MC_BBS (status);
create index IDX_MC_BBS_SECTION on MC_BBS (section);



-- 관리자
DROP TABLE IF EXISTS MC_ADMIN;
CREATE TABLE MC_ADMIN (
  num int NOT NULL auto_increment,
  cla char(1),
  admin_id varchar(30) not null,
  admin_pw varchar(30) not null,
  admin_nm varchar(30),
  admin_email varchar(100),
  permit_ip text,
  authority text,
  view_yn char(1) default 'y',
  content varchar(200),
  write_id varchar(100),
  write_date datetime,
  write_ip varchar(15),
  login_date datetime,
  login_ip varchar(100),
  login_qty int default 0,
  del_id varchar(100) default '',
  del_date datetime,
  del_ip varchar(15),
  PRIMARY KEY  (num)
) ENGINE=innodb DEFAULT CHARSET=utf8;

insert into	 MC_ADMIN (admin_id, admin_pw) value ('miracle','miracle');


-- 관리자 로그
DROP TABLE IF EXISTS MC_ADMIN_LOG;
CREATE TABLE MC_ADMIN_LOG (
  seq int NOT NULL auto_increment,
  sql_log text,
  input_id varchar(100),
  input_date datetime,
  input_ip varchar(15),
  PRIMARY KEY  (seq)
) ENGINE=innodb DEFAULT CHARSET=utf8;

