# The MIT License
#
# Copyright (c) 2010 Olle Törnström studiomediatech.com
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
# @author Olle Törnström olle[at]studiomediatech[dot]com
# @created 2010-02-07
#
class Compressor

  def initialize
    @reference_prefix = "`"
    @reference_prefix_code = @reference_prefix[0]
    @reference_int_base = 96
    @reference_int_floor_code = " ".ord
    @reference_int_ceil_code = @reference_int_floor_code + @reference_int_base - 1
    @max_string_distance = @reference_int_base ** 2 - 1
    @min_string_length = 5
    @max_string_length = @reference_int_base ** 1 - 1 + @min_string_length
    @max_window_length = @max_string_distance + @min_string_length
    @default_window_length = 144
  end

  def compress(data, window_length = @default_window_length)
    compressed = ""
    pos = 0
    last_pos = data.length - @min_string_length
    while pos < last_pos do
      search_start = [pos - window_length, 0].max
      match_length = @min_string_length
      found_match = false
      best_match_distance = @max_string_distance
      best_match_length = 0
      # new_compressed = nil
      while (search_start + match_length) < pos do
        m1 = data[search_start, match_length]
        m2 = data[pos, match_length]
        is_valid_match = (m1 == m2 and match_length < @max_string_length)
        if is_valid_match 
          match_length += 1
          found_match = true
        else
          real_match_length = match_length - 1
          if found_match and real_match_length > best_match_length
            best_match_distance = pos - search_start - real_match_length
            best_match_length = real_match_length
          end
          match_length = @min_string_length
          search_start += 1
          found_match = false
        end
      end
      if best_match_length > 0
        head = "" << @reference_prefix
        head << encode_reference_int(best_match_distance, 2)
        tail = encode_reference_length(best_match_length)
        new_compressed = head << tail
        pos += best_match_length
      else
        if data[pos, 1] != @reference_prefix 
          new_compressed = data[pos, 1]
        else
          new_compressed = @reference_prefix << @reference_prefix
        end
        pos += 1
      end
      compressed << new_compressed
    end
    compressed + data[pos..-1].gsub(/`/, "``")
  end

  def decompress(data)
    decompressed = ""
    pos = 0
    while pos < data.length do
      current_char = data[pos, 1]
      if current_char != @reference_prefix 
        decompressed << current_char
        pos += 1
      else
        next_char = data[pos + 1, 1]
        if next_char != @reference_prefix 
          distance = decode_reference_int(data[pos + 1, 2], 2)
          length = decode_reference_length(data[pos + 3, 1])
          start = decompressed.length - distance - length
          stop = start + length
          decompressed << decompressed[start..stop-1]
          pos += @min_string_length - 1
        else
          decompressed << @reference_prefix
          pos += 2
        end
      end
    end
    decompressed
  end

  private

  def encode_reference_int(value, width)
    encoded = ""
    if value >= 0 and value < ((@reference_int_base ** width) - 1)
      while value > 0 do
        encoded = ((value % @reference_int_base) + @reference_int_floor_code).chr << encoded
        value = value / @reference_int_base
      end
      missing_length = width - encoded.length
      (0..missing_length - 1).each do
        encoded = (@reference_int_floor_code).chr << encoded
      end
      encoded
    else
      raise "Reference value out of range"
    end
  end

  def encode_reference_length(length)
    encode_reference_int(length - @min_string_length, 1)
  end

  def decode_reference_int(data, width)
    value = 0
    (0..width - 1).each do |i|
      value *= @reference_int_base
      char = data[i]
      char_code = char.ord
      print "#{char} => #{char_code}"
      if char_code >= @reference_int_floor_code and char_code <= @reference_int_ceil_code
        value += (char_code - @reference_int_floor_code)
      else
        raise "Invalid char code"
      end
    end
    value
  end

  def decode_reference_length(data)
    decode_reference_int(data, 1) + @min_string_length
  end

end