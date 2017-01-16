# this program creates an html file of all of
# the poems and displays them as a table with
# the Japanese, romaji, and English side by side

infile = open("formatted_poems.txt", "r")
outfile = open("poems.html", "w")

# initiate the html file
outfile.write("""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Japanese Alphabet</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <table>""")

# check every group of 18 lines 
# first 6 lines are Japanese
# next 6 are romaji
# last 6 are English translation

line = infile.readline()
poem_num = 1

while line:
    for i in range(18):
        if (i == 0):
            outfile.write("<tr><td>" + str(poem_num) + "</td><td>")
        
        if (i % 6 == 0 and i != 0):
            outfile.write("</td><td>")
        
        outfile.write(line + "<br>")
        line = infile.readline()

    outfile.write("</td></tr>")
    poem_num += 1

outfile.write("""
    </table>
</body>
</html>""")

infile.close()
outfile.close()