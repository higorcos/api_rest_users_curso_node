class DateFormat{
    generateExpiration(){
           
        var currentDate = new Date();
        var currentMilliseconds = currentDate.getTime();
        
        var futureMilliseconds = new Date(currentMilliseconds + (24 * 60 * 60 * 1000));
        
        var options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false, // Use 24-hour format
          timeZone: 'America/Sao_Paulo'
        };
        
        var formattedDate = futureMilliseconds.toLocaleString('en-US', options)
          .replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+:\d+)/, '$3/$1/$2 $4');
        
        // console.log(formattedDate);
        
        
        return formattedDate


    }
    now(){
        var currentDate = new Date();
        var currentMilliseconds = currentDate.getTime();
        
        var futureMilliseconds = new Date(currentMilliseconds);
        
        var options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false, // Use 24-hour format
          timeZone: 'America/Sao_Paulo'
        };
        
        var formattedDate = futureMilliseconds.toLocaleString('en-US', options)
          .replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+:\d+)/, '$3/$1/$2 $4');
        
        // console.log(formattedDate);
        
        
        return formattedDate

}

}
module.exports = new DateFormat()