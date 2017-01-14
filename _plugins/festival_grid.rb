module Jekyll
  class FestivalGrid < Liquid::Tag

    def initialize(tag_name, text, tokens)
      @tag_name = tag_name
      @text     = text
      @tokens   = tokens
    end

    def render(context)

      # --- Pulling in data  ---

      # Pulling time-range arguments from the tag and extracting the numbers
      timeRange    = @text.split(" ")
      startHours   = timeRange[0].split(":")[0].to_i
      startMinutes = timeRange[0].split(":")[1].to_i
      endHours     = timeRange[1].split(":")[0].to_i
      endMinutes   = timeRange[1].split(":")[1].to_i

      # Collecting meta-data from all the program items into an array of item hashes
      items = []
      context.registers[:site].collections["program"].docs.each do |key, value|
        item = key.data
        item["permalink"] = key.url
        items.push(item)

      end

      # --- Generating table hash ---

      # Populating a hash of columns with time slots for keys
      columns = Hash.new

      # Generating a list of available time slots from the defined time range
      timeSlots = []
      for hour in startHours..endHours
        for minuteMultiplier in 0..3
          minute = minuteMultiplier * 15
          if hour == endHours and minute > endMinutes
            break
          end
          if minute < 10
            minute = "0#{minute}"
          end
          timeSlots.push("#{hour}:#{minute}")
        end
      end

      # Populating a hash of columns with each time-slot as keys and the pulling the items into their respective time slots
      spaceNames = []
      allDayItemCount = Hash.new

      context.registers[:site].data["spaces"].each do |space|
        # Generating a titlecase list of space names
        spaceNames.push(space["name"].downcase.split(/(\s)/).map.with_index{ |x,i|
          ( i==0 || x.match(/^(?:a|is|of|the|and)$/).nil? ) ? x.capitalize : x
        }.join)


        spaceColumn = Hash.new
        if space["all-day"]
          allDayItemCount[space["name"]] = 0
        else
          timeSlots.each do |time|
            spaceColumn[time] = ''
          end
        end

        items.each do |itemHash|
          if itemHash["space"] == space["name"]
            # TODO Sort out all-day item type
            if space["all-day"]
              spaceColumn[allDayItemCount[space["name"]]] = itemHash
              allDayItemCount[space["name"]] += 1
            else
              spaceColumn[itemHash["start-time"]] = itemHash
            end
          end
        end

        columns[space["name"]] = spaceColumn
      end

      # --- HTML rendering ---

      htmlOutput = String.new

      htmlOutput << "<table>"
      htmlOutput << "<thead>"
      htmlOutput << "<th colspan='1'>Time</th>"

      # Grabbing the names for each space and appending them to the table header
      spaceNames.each do |name|
        htmlOutput << "<th colspan='2'>#{name}</th>"
      end
      htmlOutput << "</thead>"

      htmlOutput << "<tbody>"

      # Populating the table row-by-row

      skipCount = Hash.new
      allDayItemStride = Hash.new
      itemSelector = Hash.new
      context.registers[:site].data["spaces"].each do |space|
        skipCount[space["name"]]    = 0
        itemSelector[space["name"]] = 0
        if space["all-day"]
          allDayItemStride[space["name"]] = (timeSlots.length/columns[space["name"]].length).floor
        end
      end

      timeSlots.each do |time|
        minute = time.split(":")[1]
        if minute == "00"
          htmlOutput << "<tr><td>#{time}</td>"
          currentItem = Hash.new
        else
          htmlOutput << "<tr><td>&nbsp;</td>"
        end
        context.registers[:site].data["spaces"].each do |space|
          colour = space["colour"]
          borderColour = space["border-colour"]


          if space["all-day"]
            if itemSelector[space["name"]] >= columns[space["name"]].length
              currentItem = ''
            else
              if skipCount[space["name"]] > 0
                currentItem = ''
                if skipCount[space["name"]] == 1
                  itemSelector[space["name"]] += 1
                end
                skipCount[space["name"]] -= 1
              else
                currentItem = columns[space["name"]][itemSelector[space["name"]]]
                skipCount[space["name"]] = allDayItemStride[space["name"]]
              end
            end # itemSelector[space["name"]] >= columns[space["name"]].length
          else # if space["all-day"]

            currentItem = columns[space["name"]][time]
          end

          if currentItem.empty?
            if skipCount[space["name"]] == 0
              htmlOutput << "<td colspan='2'>&nbsp;</td>"
            else
              unless space["all-day"]
                skipCount[space["name"]] = skipCount[space["name"]] - 1
              end
            end
          else # currentItem.empty?
            if space["all-day"]
              rowspan = allDayItemStride[space["name"]]
              # puts "currentItem: #{currentItem}"
            else
              # Calculating duration in minutes
              itemStart = currentItem["start-time"].split(":")[0].to_i * 60 + currentItem["start-time"].split(":")[1].to_i
              itemEnd = currentItem["end-time"].split(":")[0].to_i * 60 + currentItem["end-time"].split(":")[1].to_i

              itemDuration = itemEnd - itemStart

              rowspan = (itemDuration/15).ceil
            end

            htmlOutput << "<td class='grid-item' style='background-color:#{colour};border-bottom: 7px solid #{borderColour};' colspan='2' rowspan='#{rowspan}'>"

            htmlOutput << "<a href='#{currentItem["permalink"]}'>"

            if space["all-day"]
              htmlOutput << "<span class='event_all_day'>All Day</span><br>"
            else
              skipCount[space["name"]] = rowspan-1
            end
            htmlOutput << "<span class='event_artist'>#{currentItem["artist"]} - </span><span class='event_title'>#{currentItem["title"]}</span></a></td>"
          end # else currentItem.empty?
        end
        htmlOutput << "</tr>"
      end

      htmlOutput << "</tbody>"
      htmlOutput << "</table>"

      htmlOutput
    end
  end
end

Liquid::Template.register_tag('festival_grid', Jekyll::FestivalGrid)
