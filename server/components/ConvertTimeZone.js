import moment from 'moment-timezone';

export function ConvertTimeZone(time) {
  try {
    time = new Date(time);
    const createdAtWithTimeZone = moment(time).tz('Asia/Bangkok');
    const formattedTime = createdAtWithTimeZone.format('YYYY-MM-DD HH:mm:ss');
    return formattedTime;
  } catch (error) {
    console.error('Error converting time:', error);
    return null; // Hoặc thực hiện xử lý lỗi khác
  }
}
