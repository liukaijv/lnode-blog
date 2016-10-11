import moment from 'moment';

export default function(val, format='YYYY-MM-DD HH:mm:ss'){	
	return moment(val).format(format);
}