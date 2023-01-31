let update = document.getElementById("todo_list");

if (update) {
  // for (let i = 1; i < 60; i++) {
  //   i < 10
  //     ? $("#reminder_minute").append(`<option value="0${i}">0${i}</option>`)
  //     : $("#reminder_minute").append(`<option value="0${i}">${i}</option>`);
  // }

  document
    .getElementById("update_reminder")
    .addEventListener("click", async () => {
      alert("works")
      let reminder_id = document.getElementById("reminder_id").value.trim();
      let reminder_topic = document
        .getElementById("reminder_topic")
        .value.trim();
      let reminder_content = document
        .getElementById("reminder_content")
        .value.trim();

      let reminder_hour = $("#reminder_hour").val();
      let reminder_minute = $("#reminder_minute").val();
      let reminder_meridian = $("#reminder_meridian").val();

      let email = document.getElementById("email").value.trim();

      let errors = [];

      if (reminder_id.length == 0) {
        errors.push("Please input a Reminder Id number");
      }
      if (reminder_topic.length == 0) {
        errors.push("Please input a Reminder Topic");
      }
      if (reminder_content.length == 0) {
        errors.push("Please input a Reminder Content");
      }

      console.log(
        reminder_id,
        reminder_topic,
        reminder_content,
        reminder_hour,
        reminder_minute,
        reminder_meridian,
        errors
      );

      if (errors.length == 0) {
        
        if (reminder_hour != 12 && reminder_meridian == 'PM'){
          reminder_hour = Number(reminder_hour) + 12;

        };
        if (reminder_hour == 12 && reminder_meridian == 'AM'){
          reminder_hour = Number(reminder_hour) + 12;

        }
        


        let alarm_time =  new Date();
        alarm_time.setHours(reminder_hour, reminder_minute, 0)
        alarm_time = alarm_time.toLocaleTimeString('en-GB');
        alarm_time = alarm_time.slice(0, -3)
        let time_of_setting = new Date().toLocaleTimeString('en-GB');
        time_of_setting = time_of_setting.slice(0, -3);

        console.log(alarm_time)

        let reminder_object = {
          reminder_id: reminder_id,
          reminder_topic: reminder_topic,
          reminder_content: reminder_content,
          reminder_hour: reminder_hour,
          reminder_minute: reminder_minute,
          reminder_meridian: reminder_meridian,
          email: email,
          alarm_time: alarm_time,
          time_of_setting : time_of_setting
        };

        try {
          const feedback = await axios.post(
            "/update_details",
            reminder_object
          );
          console.log(feedback);

          let message = feedback.data.message;
          let is_new_user = feedback.data.new_User;


          alert(message)



        } catch (error) {
          console.log(error);
        }
      }
    });
  }