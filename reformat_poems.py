# this program takes the raw file of poems 
# and gets rid of excessive line breaks and
# whitespace on the ends of the lines

infile = open("non_formatted_poems.txt", "r")
outfile = open("formatted_poems.txt", "w")

line = infile.readline()
while line:
    if (line != "\n"):

        outfile.write(line.strip() + "\n")
    line = infile.readline()

infile.close()
outfile.close()