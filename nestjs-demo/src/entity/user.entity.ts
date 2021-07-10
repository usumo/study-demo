import { Entity, Column, PrimaryColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('t_user')
export class User extends BaseEntity {
  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 36,
    generated: 'uuid',
    comment: '主键ID'
  })
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '姓名'
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 11,
    comment: '手机号码'
  })
  phone: string;

  @Column({
    type: 'int',
    nullable: true,
    comment: '性别'
  })
  sex: number;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'province_id',
    comment: '省份ID'
  })
  provinceId: string;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'city_id',
    comment: '城市ID'
  })
  cityId: string;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'series_id',
    comment: '车系ID'
  })
  seriesId: string;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'dealer_id',
    comment: '经销商ID'
  })
  dealerId: string;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'level_id',
    comment: '预约购车时间ID'
  })
  levelId: string;

  @Column({
    type: 'date',
    nullable: true,
    name: 'drive_time',
    comment: '试驾时间'
  })
  driveTime: Date;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'order_time',
    comment: '下单时间'
  })
  orderTime: Date;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'ip',
    comment: '用户IP'
  })
  ip: string;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'activity_id',
    comment: '活动ID'
  })
  activityId: string;

  @Column({
    type: 'int',
    nullable: false,
    default: () => 0,
    name: 'status',
    comment: '状态'
  })
  status: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'create_time',
    comment: '创建时间'
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    name: 'update_time',
    comment: '更新时间'
  })
  updateTime: Date;
}